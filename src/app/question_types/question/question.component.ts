import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { QuestioneerService }       from '../../questioneer.service'
import { Question }                 from '../../structs/questionStruct';
import { QEmitterService }          from '../../qemitter.service';
import { Capsule }                  from '../../structs/transferStructs';
import { ButtonStateCapsule}        from '../../structs/buttonStateCapsule';
import { Answer }                   from '../../structs/answerStruct';
import { BStateCheckerService }     from '../../bstate-checker.service';
import { Subscription }             from 'rxjs';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit, OnDestroy{
    sendCapsule   : Capsule;

    QSet          : Question[] = [];
    questionType? : string;
    questionText? : string;
    currentQ      : number;
    progress      : number;
    QMode         : string;

    QModeSubscription   : any;
    CapsuleSubscription : any;
    ClickSubscription   : any;
    AnswerSubscription  : any;

    totalGivenAnswers   : Answer[];
    givenAnswer         : boolean[];
    checkPressed        : boolean;
    answerCeiling       : number;

    constructor (private DataS : QuestioneerService, private CommS : QEmitterService, private BStateC : BStateCheckerService) {
        this.answerCeiling     = 0;
        this.totalGivenAnswers = []
        this.givenAnswer  = [false, false, false , false, false];
        this.currentQ     = 0;
        this.QMode        = '';
        this.checkPressed = false;
        this.progress     = this._getCurrentProgress();
        this.QSet         = DataS.getQSetMixed('ALL');
        this.questionText = this.QSet[this.currentQ].qtxt;
        this.questionType = this.QSet[this.currentQ].qtyp;
        this.sendCapsule  = this._makeCapsule(this.QSet[this.currentQ]);
        this.progress     = this._getCurrentProgress();
    }

    ngOnInit() {
        this.ClickSubscription   = this.CommS.getClickEvent().subscribe((button : string) => { this.QButtonPressed(button); 
                                                                                               this.CheckButtonPressed(button);});
        this.QModeSubscription   = this.CommS.getQModeEvent().subscribe((mode : string)   => { this.SetQMode(mode); });
        this.AnswerSubscription  = this.CommS.currentAnswer.subscribe((answer) => {this.givenAnswer = answer});
        this.CapsuleSubscription = this.CommS.currentMessage.subscribe(capsule => capsule = this.sendCapsule);        
    }

    SetQMode(mode : string) : void {
        this.QSet = this.DataS.getQSetMixed(mode);
        this._resetParameters();
    }

    QButtonPressed(BPressed : string) : void {
        this.currentQ      += BPressed === 'NEXT'  ? 1 : (BPressed === 'BACK' ? - 1 : 0);
        
        this.checkPushGivenAnswer(BPressed, this.givenAnswer);

        let checkCapsule = BPressed !== 'CHECK' ? { target : 'CHECK', disabled : false } : { target : 'CHECK', disabled : true };

        this.setWorkedQuestionState(this.QSet[this.currentQ].qtyp);

        this.CommS.sendButtonState(checkCapsule);
        this._resetParameters();
        this._checkSetButtonState();
    }

    CheckButtonPressed(BPressed : string) : void {
        if (BPressed === 'CHECK' && this.QSet[this.currentQ].qtyp === 'SCQ') {
            this.CommS.sendButtonState({ target : 'CHECK', disabled : true });
            this.totalGivenAnswers.push({ answer : this.givenAnswer, checked : true })
            for (let n = 0; n < this.givenAnswer.length; n++) {
                if (this._getCorrectAnswers()[n] === true) { 
                    this._setAnsColor(('RadioInputID_' + n), '#49fb35');
                }
                if (this._getCorrectAnswers()[n] === false && this.givenAnswer[n] === true) {
                    this._setAnsColor(('RadioInputID_' + n), 'purple');
                }
            }
        }
        this.givenAnswer  = [false, false, false, false, false];
    }

    checkPushGivenAnswer(BPressed : string, answer : any) : void {
        if (this.currentQ > this.answerCeiling){
            if (this.QSet[this.currentQ].qtyp === 'MCQ' || this.QSet[this.currentQ].qtyp === 'SCQ'){
                this.totalGivenAnswers.push({ answer : answer, checked : });
            }
            else {
                answer = ''
                this.totalGivenAnswers.push({ answer : answer});
            }
        }
        this.answerCeiling += BPressed === 'NEXT' && this.currentQ > this.answerCeiling ? 1 : 0;
    }

    private setWorkedQuestionState(qtype : string) {
        if (this.currentQ < this.answerCeiling) {
            this.CommS.sendACIstate({ target : qtype, state : this.totalGivenAnswers[this.currentQ]});
        }
    }
    
    private _resetParameters() : void {
        this.questionText = this.QSet[this.currentQ].qtxt;
        this.questionType = this.QSet[this.currentQ].qtyp;
        this.progress     = this._getCurrentProgress();
        this.SendAnswers(this._makeCapsule(this.QSet[this.currentQ]));
    }

    private _setAnsColor(docID : string, color : string) : void {
        let getEl = document.getElementById(docID) as HTMLElement;
        getEl?.style.setProperty('background-color', color);
        getEl?.style.setProperty('border-radius', '3px');
    }

    private _getCorrectAnswers() : boolean[] {
        let correctAnswers : boolean[] = [];
        for (let a of this.DataS._getAnswerSet(this.QSet[this.currentQ].qid)) {
            correctAnswers.push(a);
        }
        return correctAnswers;
    }

    private _checkSetButtonState() : void {
        if (this.currentQ === this.QSet.length - 1) {
            this.CommS.sendButtonState({ target : 'NEXT',  disabled : true });
            this.CommS.sendButtonState({ target : 'CHECK', disabled : false });
        }
        else if (this.currentQ < 1) {
            this.CommS.sendButtonState({ target : 'BACK',  disabled : true });
            this.CommS.sendButtonState({ target : 'CHECK', disabled : false });
        }
        else {
            this.CommS.sendButtonState({ target : 'NEXT', disabled : false });
            this.CommS.sendButtonState({ target : 'BACK', disabled : false });
        }
    }

    private _getCurrentProgress() : number {
        return (((this.currentQ + 1) * 100) / this.QSet.length);
    }

    private _makeCapsule(Q : Question) : Capsule {
        return {ansTxt: Q.qans, ansType : Q.qtyp};
    }

    SendAnswers(capsule : Capsule) : void {
        this.CommS.changeMessage(capsule);
    }

    newMessage() : void {
        this.CommS.changeMessage(this.sendCapsule);
    }

    ngOnDestroy(){
        this.QModeSubscription.unsubscribe();
        this.ClickSubscription.unsubscribe();
        this.CapsuleSubscription.unsubscribe();
        this.AnswerSubscription.unsubscribe();
    }
}
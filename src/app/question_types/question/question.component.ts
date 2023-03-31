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
    
    @Input() qCorrectAnswer? : any;

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

    constructor (private DataS : QuestioneerService, private CommS : QEmitterService, private BStateC : BStateCheckerService) {
        this.currentQ          = 0;
        this.totalGivenAnswers = []
        this.givenAnswer       = [false, false, false , false, false];
        this.QMode             = '';
        this.checkPressed      = false;
        this.QSet              = DataS.getQSetMixed('ALL');
        this.questionText      = this.QSet[this.currentQ].qtxt;
        this.questionType      = this.QSet[this.currentQ].qtyp;
        this.sendCapsule       = this._makeCapsule(this.QSet[this.currentQ]);
        this.progress          = this._getCurrentProgress();
    }

    ngOnInit() {
        this.ClickSubscription   = this.CommS.getClickEvent().subscribe((button : string) => { this.ButtonPressed(button); });
        this.QModeSubscription   = this.CommS.getQModeEvent().subscribe((mode : string)   => { this.SetQMode(mode); });
        this.AnswerSubscription  = this.CommS.currentAnswer.subscribe((answer) => { this.givenAnswer = answer });
        this.CapsuleSubscription = this.CommS.currentMessage.subscribe(capsule => capsule = this.sendCapsule); 
    }

    SetQMode(mode : string) : void {
        this.givenAnswer = [false, false, false, false, false]
        this.QSet     = this.DataS.getQSetMixed(mode);
        this.progress = this._getCurrentProgress();
        this._UpdateQuestionView();     
    }

    ButtonPressed(BPressed : string) : void {
        console.log(this.DataS._getAnswerSet(this.QSet[this.currentQ].qid))
        this._updateCurrentQuestion(BPressed);
        this._checkAnswered(this.QSet[this.currentQ].qtyp, BPressed);
        let Cdis = (b : boolean) => this._DisableButton('CHECK', b);
        let checkEnabled = typeof this.totalGivenAnswers[this.currentQ] !== 'undefined' ? Cdis(true) : Cdis(false);
    }

    private _updateCurrentQuestion(button : string){
        switch(button) {
            case 'NEXT'  : { this._nextPressed();  break; }
            case 'BACK'  : { this._backPressed();  break; }
            case 'CHECK' : { this._checkPressed(); break; }
                default  : { break; }
        }
    }

    private _nextPressed() : void {
        this.givenAnswer = [false,false,false,false,false];
        this.currentQ    = this.currentQ  <  this.QSet.length - 1 ? this.currentQ + 1 : this.currentQ;
        let nextBDisable = this.currentQ === this.QSet.length - 1 ? this._DisableButton('NEXT', true)  : (()=>{});
        let backBEnable  = this.currentQ  <  this.QSet.length - 1 ? this._DisableButton('BACK', false) : (()=>{});
        this.qCorrectAnswer = this._getCorrectAnswer();
        this._UpdateQuestionView();
    }

    private _backPressed() : void {
        this.givenAnswer = [false,false,false,false,false];
        this.currentQ    = this.currentQ !== 0 ? this.currentQ - 1 : this.currentQ;
        let backBDisable = this.currentQ === 0 ? this._DisableButton('BACK', true)  : (()=>{});
        let nextBEnable  = this.currentQ < this.QSet.length ? this._DisableButton('NEXT', false) : (()=>{});
        this._UpdateQuestionView();
    }

    private _checkPressed() : void {
        this.totalGivenAnswers[this.currentQ] = { answer : this.givenAnswer, checked : true };
    }

    private _UpdateQuestionView() : void {
        this.questionText = this.QSet[this.currentQ].qtxt;
        this.questionType = this.QSet[this.currentQ].qtyp;
        this.progress     = this._getCurrentProgress();
        this.SendAnswers(this._makeCapsule(this.QSet[this.currentQ]));
    }

    private _DisableButton(target : string, disabled : boolean) : void {
        this.CommS.sendButtonState({ target : target, disabled : disabled });
    }

    private _checkAnswered(Qtype : string, buttonPressed : string) : void {
        if (typeof this.totalGivenAnswers[this.currentQ] !== 'undefined') {
            this.qCorrectAnswer = this._getCorrectAnswer();
            this.CommS.sendACIstate({type : 'ANSWER_DISABLED', content : []});
            this.CommS.sendACIstate({type : Qtype, content : this.totalGivenAnswers[this.currentQ].answer});
        }
        else if (typeof this.totalGivenAnswers[this.currentQ] === 'undefined') {
            this.CommS.sendACIstate({type : 'ANSWER_ENABLED', content : []});
            this.CommS.sendACIstate({type : Qtype, content : [false,false,false,false,false]});
        }
    }

    private _getCorrectAnswer() : any {
        let correctAnswers : any = [];
        for (let a of this.DataS._getAnswerSet(this.QSet[this.currentQ].qid)) {
            correctAnswers.push(a);
        }
        return correctAnswers;
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
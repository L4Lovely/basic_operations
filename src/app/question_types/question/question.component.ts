import { Component, Input, OnInit } from '@angular/core';
import { QuestioneerService }       from '../../questioneer.service'
import { Question }                 from '../../structs/questionStruct';
import { QEmitterService }          from '../../qemitter.service';
import { Capsule }                  from '../../structs/transferStructs';
import { ButtonStateCapsule}        from '../../structs/buttonStateCapsule';
import { Subscription }             from 'rxjs';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit{
    sendCapsule   : Capsule;
    bStateCapsule : ButtonStateCapsule;

    QSet          : Question[] = [];
    questionType? : string;
    questionText? : string;
    currentQ      : number;
    progress      : number;
    
    constructor (private DataS : QuestioneerService, private CommS : QEmitterService) {
        this.currentQ      = 0;
        this.bStateCapsule = { target : '', disabled : false };
        this.progress      = this._getCurrentProgress();
        this.QSet          = DataS.getQSetMixed('ALL');
        this.questionText  = this.QSet[this.currentQ].qtxt;
        this.questionType  = this.QSet[this.currentQ].qtyp;
        this.sendCapsule   = this._makeCapsule(this.QSet[this.currentQ]);
    }

    ngOnInit() {
        this.progress      = this._getCurrentProgress();
        this.CommS.getClickEvent().subscribe((button : string) => { this.QButtonPressed(button); })
        this.CommS.currentMessage.subscribe(capsule => capsule = this.sendCapsule);
        this.SendAnswers(this._makeCapsule(this.QSet[this.currentQ]));
    }

    QButtonPressed(BPressed : string) : void {
        this.currentQ    += BPressed === 'NEXT' ? 1 : (BPressed === 'BACK' ? -1 : 0);
        this.questionText = this.QSet[this.currentQ].qtxt;
        this.questionType = this.QSet[this.currentQ].qtyp;
        
        this.SendAnswers(this._makeCapsule(this.QSet[this.currentQ]));
        
        this.progress = this._getCurrentProgress();
        this._checkSetButtonState();
    }

    private _getCurrentProgress() : number {
        return (((this.currentQ + 1) * 100) / this.QSet.length);
    }

    private _checkSetButtonState() : void {
        if (this.currentQ === this.QSet.length - 1) { 
            this.CommS.sendButtonState({ target : 'NEXT', disabled : true }); 
        }
        else if (this.currentQ < 1) { 
            this.CommS.sendButtonState({ target : 'BACK', disabled : true }); 
        }
        else { 
            this.CommS.sendButtonState({ target : 'NEXT', disabled : false });
            this.CommS.sendButtonState({ target : 'BACK', disabled : false }); 
        }
    }

    SendAnswers(capsule : Capsule) : void {
        this.CommS.changeMessage(capsule);
    }

    private _makeCapsule(Q : Question) : Capsule {
        return {ansTxt: Q.qans, ansType : Q.qtyp};
    }

    newMessage() : void {
        this.CommS.changeMessage(this.sendCapsule);
    }
}

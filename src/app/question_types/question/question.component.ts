import { Component, Input, OnInit}   from '@angular/core';
import { QuestioneerService } from '../../questioneer.service'
import { Question }           from '../../structs/questionStruct';
import { QEmitterService }    from '../../qemitter.service';
import { Capsule }    from '../../structs/transferStructs';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit{
    questionType? : string;
    @Input() questionText? : string;

    QSet       : Question[] = [];
    Answers    : Object = {};

    message:string = '2000d';
 
    sendCapsule : Capsule;

    constructor (private DataS : QuestioneerService, private CommS : QEmitterService){
        this.QSet  = DataS.getQSetMixed('ALL');
        this.questionText = this.QSet[0].qtxt;
        this.questionType = this.QSet[0].qtyp;
        this.sendCapsule  = this._makeCapsule(this.QSet[0]);
    }

    SendAnswers(capsule : Capsule) : void{
        this.CommS.changeMessage(capsule);
    }

    private _makeCapsule(Q : Question) : Capsule{
        return {ansTxt: Q.qans, ansType : Q.qtyp};
    }

    newMessage(){
        this.CommS.changeMessage(this.sendCapsule);
    }

    ngOnInit() {
        this.CommS.currentMessage.subscribe(capsule => capsule = this.sendCapsule);
        this.SendAnswers(this._makeCapsule(this.QSet[0]))
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestioneerService} from '../../../questioneer.service';
import { QEmitterService } from '../../../qemitter.service';
import { Capsule } from '../../../structs/transferStructs';  

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit, OnDestroy{
  getCapsule : Capsule;
  CapsuleSubscription : any;

  givenAnswer : boolean[];

  constructor(private CommS: QEmitterService){
    this.getCapsule  = { ansTxt: [''], ansType : '' };
    this.givenAnswer = [false, false, false, false, false]
  }

  ngOnInit() {
    this.CapsuleSubscription = this.CommS.currentMessage.subscribe(capsule => this.getCapsule = capsule);
  }

  ngOnDestroy() {
    this.CapsuleSubscription.unsubscribe();
  }

  onCheckBoxClicked(event : any, id : number){
    this.givenAnswer[id] = event.checked;
    this.CommS.changeAnswer(this.givenAnswer);
  }
}

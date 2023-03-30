import { Component, OnInit, OnDestroy, Input, Output, ElementRef } from '@angular/core';
import { QuestioneerService} from '../../../questioneer.service';
import { QEmitterService } from '../../../qemitter.service';
import { Capsule } from '../../../structs/transferStructs';  

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.css']
})
export class SingleChoiceComponent implements OnInit, OnDestroy {
  getCapsule : Capsule;
  givenAnswer : boolean[];

  checkedList : boolean[] = [false,false,false,false,false]

  buttonsDisabled : boolean;

  CapsuleSubscription    : any;
  ACIControlSubscription : any;

  constructor(private CommS: QEmitterService) {
    this.buttonsDisabled = false;
    this.givenAnswer = [false, true, false, false, false]
    this.getCapsule = { ansTxt: [''], ansType : '' };
  }

  ngOnInit() {
    this.CapsuleSubscription = this.CommS.currentMessage.subscribe(capsule => this.getCapsule = capsule);
    this.ACIControlSubscription = this.CommS.getACInputs().subscribe((state : any) => { this.setRadioButtonState(state); });
  }

  setRadioButtonState(state : any) : void {
    this.checkedList = state.state.answer;
  }

  onCheckBoxClicked(event : any, id : number) {
    this.givenAnswer = [false, false, false, false, false]
    this.givenAnswer[id] = true;
    this.CommS.changeAnswer(this.givenAnswer);
    console.log(this.givenAnswer)
  }

  ngOnDestroy() {
    this.CapsuleSubscription.unsubscribe();
    this.ACIControlSubscription.unsubscribe();
  }
}
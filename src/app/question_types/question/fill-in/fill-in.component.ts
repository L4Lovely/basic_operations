import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { QuestioneerService} from '../../../questioneer.service';
import { QEmitterService } from '../../../qemitter.service';
import { Capsule } from '../../../structs/transferStructs'; 

@Component({
  selector: 'app-fill-in',
  templateUrl: './fill-in.component.html',
  styleUrls: ['./fill-in.component.css']
})
export class FillInComponent implements OnInit, OnDestroy {
  getCapsule : Capsule;
  givenAnswer : string[];

  checkedList : boolean[] = [false,false,false,false,false]

  buttonsDisabled : boolean;

  CapsuleSubscription     : any;
  ACIControlSubscription  : any;
  BStateSubscription      : any;

  @Input() correctAnswer? : any;

  constructor(private CommS: QEmitterService) {
    this.buttonsDisabled = false;
    this.givenAnswer = ['']
    this.getCapsule = { ansTxt: [''], ansType : '' };
  }

  ngOnInit() {
    this.CapsuleSubscription = this.CommS.currentMessage.subscribe(capsule => this.getCapsule = capsule);
    this.ACIControlSubscription = this.CommS.getACInputs().subscribe((state : any) => { this.setCheckButtonState(state); });
    this.BStateSubscription = this.CommS.getButtonStateEvent().subscribe((button : string) => { this.onQuestionButtonPress(button); });
  }

  setCheckButtonState(state : any) : void {
    this.checkedList = state.type === 'FIQ' ? state.content : [''];
    if      (state.type === 'ANSWER_DISABLED') { this.buttonsDisabled = true;  }
    else if (state.type === 'ANSWER_ENABLED')  { this.buttonsDisabled = false; }
  }

  onLabelInput(event : any) {
    this.givenAnswer[0] = event.target.value
    this.CommS.changeAnswer(this.givenAnswer);
    console.log(this.correctAnswer)
  }

  onQuestionButtonPress(button : any){
    if (button.target !== 'CHECK'){
      this.givenAnswer = [''];
    }
  }

  ngOnDestroy() {
    this.BStateSubscription.unsubscribe()
    this.CapsuleSubscription.unsubscribe();
    this.ACIControlSubscription.unsubscribe();
  }
}
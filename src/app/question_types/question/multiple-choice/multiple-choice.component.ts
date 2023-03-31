import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
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
  givenAnswer : boolean[];

  checkedList : boolean[] = [false,false,false,false,false]

  buttonsDisabled : boolean;

  CapsuleSubscription     : any;
  ACIControlSubscription  : any;
  BStateSubscription      : any;

  @Input() correctAnswer? : any;

  constructor(private CommS: QEmitterService) {
    this.buttonsDisabled = false;
    this.givenAnswer = [false, false, false, false, false]
    this.getCapsule = { ansTxt: [''], ansType : '' };
  }

  ngOnInit() {
    this.CapsuleSubscription = this.CommS.currentMessage.subscribe(capsule => this.getCapsule = capsule);
    this.ACIControlSubscription = this.CommS.getACInputs().subscribe((state : any) => { this.setCheckButtonState(state); });
    this.BStateSubscription = this.CommS.getButtonStateEvent().subscribe((button : string) => { this.onQuestionButtonPress(button); });
  }

  setCheckButtonState(state : any) : void {
    this.checkedList = state.type === 'MCQ' ? state.content : [false,false,false,false,false];
    if      (state.type === 'ANSWER_DISABLED') { this.buttonsDisabled = true;  }
    else if (state.type === 'ANSWER_ENABLED')  { this.buttonsDisabled = false; }
  }

  onCheckBoxClicked(event : any, id : number) {
    this.givenAnswer[id] = event.checked;
    this.CommS.changeAnswer(this.givenAnswer); 
  }

  onQuestionButtonPress(button : any){
    if (button.target !== 'CHECK'){
      this.givenAnswer = [false,false,false,false,false];
    }
  }

  ngOnDestroy() {
    this.BStateSubscription.unsubscribe()
    this.CapsuleSubscription.unsubscribe();
    this.ACIControlSubscription.unsubscribe();
  }
}
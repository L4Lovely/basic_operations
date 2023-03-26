import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestioneerService} from '../../../questioneer.service';
import { QEmitterService } from '../../../qemitter.service';
import { Capsule } from '../../../structs/transferStructs';  

@Component({
  selector: 'app-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.css']
})
export class MultipleChoiceComponent implements OnInit{
  getCapsule : Capsule;

  constructor(private CommS: QEmitterService){
    this.getCapsule = { ansTxt: [''], ansType : '' };
  }

  ngOnInit() {
    this.CommS.currentMessage.subscribe(capsule => this.getCapsule = capsule);
  }
}

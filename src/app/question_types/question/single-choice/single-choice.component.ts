import { Component, OnInit } from '@angular/core';
import { QuestioneerService} from '../../../questioneer.service';
import { QEmitterService } from '../../../qemitter.service';
import { Capsule } from '../../../structs/transferStructs';  

@Component({
  selector: 'app-single-choice',
  templateUrl: './single-choice.component.html',
  styleUrls: ['./single-choice.component.css']
})
export class SingleChoiceComponent implements OnInit{
  getCapsule : Capsule;

  constructor(private CommS: QEmitterService){
    this.getCapsule = { ansTxt: [''], ansType : '' };
  }

  ngOnInit() {
    this.CommS.currentMessage.subscribe(capsule => this.getCapsule = capsule);
  }
}

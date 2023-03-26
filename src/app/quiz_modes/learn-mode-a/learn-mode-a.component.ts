import { Component, Input, OnInit } from '@angular/core';
import { QuestioneerService} from '../../questioneer.service';
import { QuestionComponent } from '../../question_types/question/question.component';
import { QEmitterService }   from '../../qemitter.service';

@Component({
  selector: 'app-learn-mode-a',
  templateUrl: './learn-mode-a.component.html',
  styleUrls: ['./learn-mode-a.component.css']
})
export class LearnModeAComponent implements OnInit {
  @Input() sequencerTitle : string;
  @Input() quizHidden     : boolean;

  @Input() quizMode       : string;

  constructor (private questioneerService : QuestioneerService, private CommS : QEmitterService){
    this.sequencerTitle = 'Learn Mode A';
    this.quizHidden     = true;
    this.quizMode       = '';
  }

  ngOnInit() {
  }

  onClick(mode : string) : void {
    this.quizHidden = false;
    this.CommS.sendQModeEvent(mode);
  }
}
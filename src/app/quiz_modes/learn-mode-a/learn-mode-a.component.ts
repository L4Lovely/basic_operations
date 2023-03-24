import { Component } from '@angular/core';
import { QuestioneerService} from '../../questioneer.service';
import { QuestionComponent } from '../../question_types/question/question.component';

@Component({
  selector: 'app-learn-mode-a',
  templateUrl: './learn-mode-a.component.html',
  styleUrls: ['./learn-mode-a.component.css']
})
export class LearnModeAComponent {
  sequencerTitle : string = "Learn Mode A";

  questionList : any = '';

  constructor (private questioneerService : QuestioneerService){

  }
}
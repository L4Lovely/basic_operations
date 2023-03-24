import { Component } from '@angular/core';

@Component({
  selector: 'app-exam-mode',
  templateUrl: './exam-mode.component.html',
  styleUrls: ['./exam-mode.component.css']
})
export class ExamModeComponent {
  sequencerTitle : string = 'Exam Mode';
  solutionDisabled : boolean = true;
}

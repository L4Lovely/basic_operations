import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent {
    @Input() quizTitle? : string;
    @Input() solutionDisabled? : boolean;
}
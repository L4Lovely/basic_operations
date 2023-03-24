import { Component } from '@angular/core';

@Component({
  selector: 'app-check-mode',
  templateUrl: './check-mode.component.html',
  styleUrls: ['./check-mode.component.css']
})
export class CheckModeComponent {
  sequencerTitle : string = 'Check Mode';
  showSolutionButton : boolean = false;
}

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }        from './home/home.component';
import { LearnModeAComponent }  from './quiz_modes/learn-mode-a/learn-mode-a.component';
import { LearnModeBComponent }  from './quiz_modes/learn-mode-b/learn-mode-b.component';
import { CheckModeComponent }   from './quiz_modes/check-mode/check-mode.component';
import { ExamModeComponent }    from './quiz_modes/exam-mode/exam-mode.component';
import { AboutComponent }       from './about/about.component';
import { SequencerComponent }   from './quiz_types/sequencer/sequencer.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home',         component: HomeComponent},
  {path: 'learn_mode_a', component: LearnModeAComponent,
    children: [
        { path: 'single_choice_quiz', component: SequencerComponent },
        { path: 'multiple_choice_quiz', component: SequencerComponent },
        { path: 'fill_in_quiz', component: SequencerComponent },
        { path: 'mixed_quiz', component: SequencerComponent }
      ]
  },
  {path: 'learn_mode_b', component: LearnModeBComponent},
  {path: 'check_mode',   component: CheckModeComponent},
  {path: 'exam_mode',    component: ExamModeComponent},
  {path: 'about',        component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

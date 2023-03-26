import { NgModule }                from '@angular/core';
import { BrowserModule }           from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule }        from './app-routing.module';
import { AppComponent }            from './app.component';
import { NavbarComponent }         from './navbar/navbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SequencerComponent }      from './quiz_types/sequencer/sequencer.component';
import { ListingComponent }        from './quiz_types/listing/listing.component';
import { ResultsComponent }        from './results/results.component';
import { AboutComponent }          from './about/about.component';
import { HomeComponent }           from './home/home.component';
import { LearnModeAComponent }     from './quiz_modes/learn-mode-a/learn-mode-a.component';
import { LearnModeBComponent }     from './quiz_modes/learn-mode-b/learn-mode-b.component';
import { CheckModeComponent }      from './quiz_modes/check-mode/check-mode.component';
import { ExamModeComponent }       from './quiz_modes/exam-mode/exam-mode.component';
import { QEmitterService }         from './qemitter.service';

import { MatButtonModule }         from '@angular/material/button'; 
import { MatCardModule }           from '@angular/material/card'; 
import { MatDividerModule }        from '@angular/material/divider';
import { QuestionComponent }       from './question_types/question/question.component'; 
import { MatCheckboxModule }       from '@angular/material/checkbox';
import { MatFormFieldModule }      from '@angular/material/form-field';
import { MatInputModule }          from '@angular/material/input';
import { SingleChoiceComponent }   from './question_types/question/single-choice/single-choice.component';
import { MultipleChoiceComponent } from './question_types/question/multiple-choice/multiple-choice.component';
import { FillInComponent }         from './question_types/question/fill-in/fill-in.component';
import { MatRadioModule }          from '@angular/material/radio';
import { MatProgressBarModule }    from '@angular/material/progress-bar';

import {QuestioneerService} from './questioneer.service'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SequencerComponent,
    ListingComponent,
    ResultsComponent,
    AboutComponent,
    HomeComponent,
    LearnModeAComponent,
    LearnModeBComponent,
    CheckModeComponent,
    ExamModeComponent,
    QuestionComponent,
    SingleChoiceComponent,
    MultipleChoiceComponent,
    FillInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatProgressBarModule
  ],
  providers: [QuestioneerService, QEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}

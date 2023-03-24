import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamModeComponent } from './exam-mode.component';

describe('ExamModeComponent', () => {
  let component: ExamModeComponent;
  let fixture: ComponentFixture<ExamModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

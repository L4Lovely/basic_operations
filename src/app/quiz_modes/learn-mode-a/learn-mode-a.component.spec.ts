import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnModeAComponent } from './learn-mode-a.component';

describe('LearnModeAComponent', () => {
  let component: LearnModeAComponent;
  let fixture: ComponentFixture<LearnModeAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnModeAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnModeAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

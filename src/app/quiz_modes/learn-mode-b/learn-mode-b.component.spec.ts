import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnModeBComponent } from './learn-mode-b.component';

describe('LearnModeBComponent', () => {
  let component: LearnModeBComponent;
  let fixture: ComponentFixture<LearnModeBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnModeBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnModeBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

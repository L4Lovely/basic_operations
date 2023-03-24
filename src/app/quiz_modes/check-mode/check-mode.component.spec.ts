import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckModeComponent } from './check-mode.component';

describe('CheckModeComponent', () => {
  let component: CheckModeComponent;
  let fixture: ComponentFixture<CheckModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

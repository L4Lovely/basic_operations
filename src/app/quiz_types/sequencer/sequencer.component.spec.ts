import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencerComponent } from './sequencer.component';

describe('SequencerComponent', () => {
  let component: SequencerComponent;
  let fixture: ComponentFixture<SequencerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequencerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SequencerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

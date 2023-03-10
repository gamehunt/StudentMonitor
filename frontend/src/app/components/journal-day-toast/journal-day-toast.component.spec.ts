import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalDayToastComponent } from './journal-day-toast.component';

describe('JournalDayToastComponent', () => {
  let component: JournalDayToastComponent;
  let fixture: ComponentFixture<JournalDayToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalDayToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JournalDayToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

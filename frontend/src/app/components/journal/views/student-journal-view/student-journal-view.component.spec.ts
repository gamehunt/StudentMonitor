import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentJournalViewComponent } from './student-journal-view.component';

describe('StudentJournalViewComponent', () => {
  let component: StudentJournalViewComponent;
  let fixture: ComponentFixture<StudentJournalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentJournalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentJournalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

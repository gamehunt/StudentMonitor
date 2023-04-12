import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherJournalViewComponent } from './teacher-journal-view.component';

describe('TeacherJournalViewComponent', () => {
  let component: TeacherJournalViewComponent;
  let fixture: ComponentFixture<TeacherJournalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherJournalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherJournalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

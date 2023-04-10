import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonToDayDialogComponent } from './add-lesson-to-day-dialog.component';

describe('AddLessonToDayDialogComponent', () => {
  let component: AddLessonToDayDialogComponent;
  let fixture: ComponentFixture<AddLessonToDayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonToDayDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLessonToDayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

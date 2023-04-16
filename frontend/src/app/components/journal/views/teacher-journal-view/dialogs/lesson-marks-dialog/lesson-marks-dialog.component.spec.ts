import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonMarksDialogComponent } from './lesson-marks-dialog.component';

describe('LessonMarksDialogComponent', () => {
  let component: LessonMarksDialogComponent;
  let fixture: ComponentFixture<LessonMarksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonMarksDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonMarksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

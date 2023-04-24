import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherDayToastComponent } from './teacher-day-toast.component';

describe('TeacherDayToastComponent', () => {
  let component: TeacherDayToastComponent;
  let fixture: ComponentFixture<TeacherDayToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherDayToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherDayToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

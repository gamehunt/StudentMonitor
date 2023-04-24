import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDayToastComponent } from './student-day-toast.component';

describe('StudentDayToastComponent', () => {
  let component: StudentDayToastComponent;
  let fixture: ComponentFixture<StudentDayToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDayToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDayToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

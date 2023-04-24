import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalMarksDialogComponent } from './total-marks-dialog.component';

describe('TotalMarksDialogComponent', () => {
  let component: TotalMarksDialogComponent;
  let fixture: ComponentFixture<TotalMarksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalMarksDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalMarksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

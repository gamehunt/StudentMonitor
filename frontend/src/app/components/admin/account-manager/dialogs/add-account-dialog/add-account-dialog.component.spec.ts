import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountDialogComponent } from './add-account-dialog.component';

describe('AddAccountDialogComponent', () => {
  let component: AddAccountDialogComponent;
  let fixture: ComponentFixture<AddAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccountDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

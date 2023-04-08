import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDayToastComponent } from './editor-day-toast.component';

describe('EditorDayToastComponent', () => {
  let component: EditorDayToastComponent;
  let fixture: ComponentFixture<EditorDayToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorDayToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorDayToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJournalViewComponent } from './admin-journal-view.component';

describe('AdminJournalViewComponent', () => {
  let component: AdminJournalViewComponent;
  let fixture: ComponentFixture<AdminJournalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJournalViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJournalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

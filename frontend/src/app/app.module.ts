import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { JournalComponent } from './components/journal/journal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JournalDayToastComponent } from './components/journal-day-toast/journal-day-toast.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { BaseManagerComponent } from './components/admin/base-manager/base-manager.component';
import { AccountManagerComponent } from './components/admin/account-manager/account-manager.component';
import { AddAccountDialogComponent } from './components/admin/account-manager/dialogs/add-account-dialog/add-account-dialog.component';
import { ConfirmationDialogComponent } from './components/admin/confirmation-dialog/confirmation-dialog.component';
import { RoleManagerComponent } from './components/admin/role-manager/role-manager.component';
import { AddRoleDialogComponent } from './components/admin/role-manager/dialogs/add-role-dialog/add-role-dialog.component';
import { GroupManagerComponent } from './components/admin/group-manager/group-manager.component';
import { AddStudentDialogComponent } from './components/admin/group-manager/dialogs/add-student-dialog/add-student-dialog.component';
import { AddGroupDialogComponent } from './components/admin/group-manager/dialogs/add-group-dialog/add-group-dialog.component';
import { LessonManagerComponent } from './components/admin/lesson-manager/lesson-manager.component';
import { AddLessonDialogComponent } from './components/admin/lesson-manager/dialogs/add-lesson-dialog/add-lesson-dialog.component';
import { ScheduleEditorComponent } from './components/admin/schedule-editor/schedule-editor.component';
import { EditorDayToastComponent } from './components/admin/schedule-editor/editor-day-toast/editor-day-toast.component';
import { AddLessonToDayDialogComponent } from './components/admin/schedule-editor/dialogs/add-lesson-to-day-dialog/add-lesson-to-day-dialog.component';
import { StudentJournalViewComponent } from './components/journal/views/student-journal-view/student-journal-view.component';
import { TeacherJournalViewComponent } from './components/journal/views/teacher-journal-view/teacher-journal-view.component';
import { LessonMarksDialogComponent } from './components/journal/views/teacher-journal-view/dialogs/lesson-marks-dialog/lesson-marks-dialog.component';
import { StudentDayToastComponent } from './components/journal/views/student-journal-view/student-day-toast/student-day-toast.component';
import { TeacherDayToastComponent } from './components/journal/views/teacher-journal-view/teacher-day-toast/teacher-day-toast.component';
import { TotalMarksDialogComponent } from './components/journal/views/teacher-journal-view/dialogs/total-marks-dialog/total-marks-dialog.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { PrintFormComponent } from './components/journal/views/teacher-journal-view/dialogs/total-marks-dialog/print-form/print-form.component';
import { AdminJournalViewComponent } from './components/admin/admin-journal-view/admin-journal-view.component';
import { PermissionEditorComponent } from './components/admin/role-manager/permission-editor/permission-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    LoginModalComponent,
    JournalComponent,
    JournalDayToastComponent,
    BaseManagerComponent,
    AccountManagerComponent,
    AddAccountDialogComponent,
    ConfirmationDialogComponent,
    RoleManagerComponent,
    AddRoleDialogComponent,
    GroupManagerComponent,
    AddStudentDialogComponent,
    AddGroupDialogComponent,
    LessonManagerComponent,
    AddLessonDialogComponent,
    ScheduleEditorComponent,
    EditorDayToastComponent,
    AddLessonToDayDialogComponent,
    StudentJournalViewComponent,
    TeacherJournalViewComponent,
    LessonMarksDialogComponent,
    StudentDayToastComponent,
    TeacherDayToastComponent,
    TotalMarksDialogComponent,
    PrintLayoutComponent,
    PrintFormComponent,
    AdminJournalViewComponent,
    PermissionEditorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTableModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatButtonToggleModule,
    DragDropModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

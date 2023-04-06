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
import { JournalComponent } from './components/journal/journal.component';
import { FormsModule } from '@angular/forms';
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
    FormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

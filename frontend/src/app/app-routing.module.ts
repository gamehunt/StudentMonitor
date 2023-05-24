import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerComponent } from './components/admin/account-manager/account-manager.component';
import { GroupManagerComponent } from './components/admin/group-manager/group-manager.component';
import { LessonManagerComponent } from './components/admin/lesson-manager/lesson-manager.component';
import { RoleManagerComponent } from './components/admin/role-manager/role-manager.component';
import { ScheduleEditorComponent } from './components/admin/schedule-editor/schedule-editor.component';
import { JournalComponent } from './components/journal/journal.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { PrintFormComponent } from './components/journal/views/teacher-journal-view/dialogs/total-marks-dialog/print-form/print-form.component';

const routes: Routes = [
  { path: 'journal', component: JournalComponent },
  { path: 'managment',
    children: [
        { path: 'accounts', component: AccountManagerComponent },
        { path: 'roles',    component: RoleManagerComponent },
        { path: 'groups',   component: GroupManagerComponent },
        { path: 'lessons',  component: LessonManagerComponent },
        { path: 'lessons/schedule-editor', component: ScheduleEditorComponent },
    ]
  },
  {
    path: '_',
    children: [
        { path: 'print',
        outlet: 'print',
        component: PrintLayoutComponent,
        children: [
            { path: 'total_marks/:data', component: PrintFormComponent }
        ]
      },
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'journal' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
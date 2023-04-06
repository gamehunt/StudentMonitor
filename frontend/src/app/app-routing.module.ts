import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerComponent } from './components/admin/account-manager/account-manager.component';
import { BaseManagerComponent } from './components/admin/base-manager/base-manager.component';
import { GroupManagerComponent } from './components/admin/group-manager/group-manager.component';
import { RoleManagerComponent } from './components/admin/role-manager/role-manager.component';
import { JournalComponent } from './components/journal/journal.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'journal' },
  { path: 'journal', component: JournalComponent },
  { path: 'managment/accounts', component: AccountManagerComponent },
  { path: 'managment/roles',    component: RoleManagerComponent },
  { path: 'managment/groups',   component: GroupManagerComponent },
  { path: 'managment/lessons',  component: BaseManagerComponent },
  { path: 'managment/students', component: BaseManagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
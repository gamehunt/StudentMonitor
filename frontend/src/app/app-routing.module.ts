import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './components/journal/journal.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'journal' },
  { path: 'journal', component: JournalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
import { Component } from '@angular/core';
import { JournalDayToastComponent } from 'src/app/components/journal-day-toast/journal-day-toast.component';

@Component({
  selector: 'teacher-day-toast',
  templateUrl: './teacher-day-toast.component.html',
  styleUrls: ['./../../../../journal-day-toast/journal-day-toast.component.scss', './teacher-day-toast.component.scss']
})
export class TeacherDayToastComponent extends JournalDayToastComponent{

}

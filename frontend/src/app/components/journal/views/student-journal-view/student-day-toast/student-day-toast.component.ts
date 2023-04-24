import { Component, Input } from '@angular/core';
import { JournalEntry, LessonOrder } from 'shared';
import { JournalDayToastComponent } from 'src/app/components/journal-day-toast/journal-day-toast.component';

@Component({
  selector: 'student-day-toast',
  templateUrl: 'student-day-toast.component.html',
  styleUrls: ['./../../../../journal-day-toast/journal-day-toast.component.scss', './student-day-toast.component.scss']
})
export class StudentDayToastComponent extends JournalDayToastComponent{
    @Input()
    marks: JournalEntry[] = []

    was(data: LessonOrder) {
        return this.marks.find(e => e.lesson.id == data.id)?.was != undefined
    }
}

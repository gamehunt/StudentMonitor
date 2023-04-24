import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DayLessons, JournalEntry, Lesson, LessonOrder } from 'shared';
import { LessonsService } from 'src/app/services/lessons.service';

export class LessonClickData {
    lesson!: LessonOrder
    date!: Date
}

@Component({
  selector: 'journal-day-toast',
  templateUrl: './journal-day-toast.component.html',
  styleUrls: ['./journal-day-toast.component.scss']
})
export class JournalDayToastComponent {
    constructor(@Inject(MAT_DATE_LOCALE) private _locale: string) {}

    @Input()
    date: Date = new Date()

    @Input()
    isActive: boolean = false

    @Input()
    lessons: DayLessons = []

    @Output()
    lessonClicked: EventEmitter<LessonClickData> = new EventEmitter()

    getDate()
    {
        let weekday = this.date.toLocaleDateString(this._locale, { year: 'numeric', day: 'numeric', month: 'numeric', weekday: 'long' })
        return weekday.charAt(0).toUpperCase()+ weekday.slice(1);
    }

    handleLessonClick(data: LessonOrder | null) {
        if(!data) {
            return;
        }
        this.lessonClicked.emit({lesson: data, date: this.date})
    }
}

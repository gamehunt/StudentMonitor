import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, Input, SimpleChanges } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LessonQueryResult, Lesson, LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-journal-day-toast',
  templateUrl: './journal-day-toast.component.html',
  styleUrls: ['./journal-day-toast.component.scss']
})
export class JournalDayToastComponent {
    constructor(private lessonsService: LessonsService, @Inject(MAT_DATE_LOCALE) private _locale: string) {}

    @Input()
    date: Date = new Date()

    @Input()
    isActive: boolean = false

    @Input()
    lessons: LessonQueryResult = []

    getDate()
    {
        let weekday = this.date.toLocaleDateString(this._locale, { year: 'numeric', day: 'numeric', month: 'numeric', weekday: 'long' })
        return weekday.charAt(0).toUpperCase()+ weekday.slice(1);
    }
}

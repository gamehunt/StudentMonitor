import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, Input, SimpleChanges } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-journal-day-toast',
  templateUrl: './journal-day-toast.component.html',
  styleUrls: ['./journal-day-toast.component.scss']
})
export class JournalDayToastComponent {
    constructor(@Inject(MAT_DATE_LOCALE) private _locale: string) {}

    @Input()
    date: Date = new Date()

    @Input()
    currentDate: Date = new Date()

    isActive: boolean = false

    ngOnInit(){
        this.isActive = this.checkIsActive()
    }

    ngOnChanges(changes: SimpleChanges) {
        this.ngOnInit()
    }

    checkIsActive(){
        return  this.date.getDay()      == this.currentDate.getDay()   &&
                this.date.getMonth()    == this.currentDate.getMonth() &&
                this.date.getFullYear() == this.currentDate.getFullYear();
    }

    getDate()
    {
        let weekday = this.date.toLocaleDateString(this._locale, { year: 'numeric', day: 'numeric', month: 'numeric', weekday: 'long' })
        return weekday.charAt(0).toUpperCase()+ weekday.slice(1);
    }
}

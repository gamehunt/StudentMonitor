import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { LessonsService } from 'src/app/services/lessons.service';
import { interval, Subscription } from 'rxjs';
import { TimeService } from 'src/app/services/time.service';
import { Lesson } from 'shared';

@Component({
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent {
  smallScreen: boolean = false;
  
  currentDate: Date = new Date();
  currentTime: Date = new Date();

  lessons: Lesson[][] = []

  monday: Date = new Date()

  updateSubscribtion!: Subscription

  constructor(private responsive: BreakpointObserver, 
              private lessonsService: LessonsService,
              private timeService: TimeService) {}

  ngOnInit() {
    this.responsive.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
        this.smallScreen = result.matches;
    });
    this.monday = this.getMonday(this.currentDate)
    this.lessonsService.getLessonsForWeek(false).subscribe((r) => {
        if(r.ok){
            this.lessons = r.data!;
        }
    })
    this.updateSubscribtion = interval(30 * 1000).subscribe(_ => this.updateTime());
    this.updateTime()
  }

  ngOnChanges(){
    this.monday = this.getMonday(this.currentDate)
  }

  ngOnDestroy() {
    this.updateSubscribtion.unsubscribe();
  }

  checkIsActive(day: number): boolean{
    let d = this.offsetDate(day)
    return  d.getDate()  == this.currentDate.getDate() &&
            d.getMonth() == this.currentDate.getMonth() &&
            d.getFullYear() == this.currentDate.getFullYear();
  }

  getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  offsetDate(amount: number) : Date{
    let d = new Date(this.monday);
    d.setDate(d.getDate() + amount);
    return d;
  }

  reset() : void{
    this.currentDate = new Date()
  }

  updateTime() : void{
    this.timeService.getTime().subscribe((d: number) => {
        this.currentTime = new Date(d)
    })
  }

  timeString() : string {
    return `${this.currentTime.getHours()}:${this.currentTime.getMinutes().toString().padStart(2, '0')}`
  }
}

import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Lesson, LessonsService, LessonQueryResult } from 'src/app/services/lessons.service';

@Component({
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent {
  smallScreen: boolean = false;
  
  currentDate: Date = new Date();

  lessons: LessonQueryResult[] = []

  monday: Date = new Date()

  constructor(private responsive: BreakpointObserver, private lessonsService: LessonsService) {}

  ngOnInit() {
    this.responsive.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
        this.smallScreen = result.matches;
    });
    this.monday = this.getMonday(this.currentDate)
    this.lessonsService.getLessons(false).subscribe((r: LessonQueryResult[]) => {
        this.lessons = r;
    })
  }

  ngOnChanges(){
    this.monday = this.getMonday(this.currentDate)
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

  offsetDate(amount: number){
    let d = new Date(this.monday);
    d.setDate(d.getDate() + amount);
    return d;
  }

  reset(){
    this.currentDate = new Date()
  }
}

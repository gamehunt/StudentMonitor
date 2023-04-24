import { Component, Input } from '@angular/core';
import { JournalEntry, LessonOrder, WeekLessons, getMonday } from 'shared';
import { JournalService } from 'src/app/services/journal.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'student-journal-view',
  templateUrl: './student-journal-view.component.html',
  styleUrls: ['./student-journal-view.component.scss']
})
export class StudentJournalViewComponent {
    @Input()
    isSmallScreen: boolean = false

    lessons: WeekLessons = []
    marks: JournalEntry[] = []

    monday: Date = new Date()

    currentDate: Date = new Date();
    currentTime: Date = new Date();

    constructor(private userService: UserService, private lessonsService: LessonsService, private journalService: JournalService) {}

    ngOnInit() {
        this.refresh()
    }

    ngOnChanges(){
        this.monday = getMonday(this.currentDate)
    }
    
    offsetInWeek(amount: number) : Date{
        let d = new Date(this.monday);
        d.setDate(d.getDate() + amount);
        return d;
    }

    checkIsActive(day: number): boolean{
        let d = this.offsetInWeek(day)
        return  d.getDate()  == this.currentDate.getDate() &&
                d.getMonth() == this.currentDate.getMonth() &&
                d.getFullYear() == this.currentDate.getFullYear();
    }

    reset() : void{
        this.currentDate = new Date()
    }

    refresh(){
        this.monday = getMonday(this.currentDate)
        if(this.userService.isLoggedIn()){
            this.lessonsService.getLessonsForWeek(false, this.userService.getUser().group).subscribe((r) => {
                if(r.ok){
                    this.lessons = r.data!;
                }
            })
            this.journalService.getMarksForStudent(this.userService.getUser(), this.monday).subscribe(data => {
                if(data.ok) {
                    this.marks = data.data!
                }
            })
        }
    }

    marksForDay(date: Date) {
        return this.marks.filter(v => (v.date as unknown as number) == date.getTime()) ?? []
    }
}

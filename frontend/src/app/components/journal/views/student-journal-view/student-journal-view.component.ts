import { Component, Input } from '@angular/core';
import { WeekLessons } from 'shared';
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

    monday: Date = new Date()

    currentDate: Date = new Date();
    currentTime: Date = new Date();

    constructor(private userService: UserService, private lessonsService: LessonsService) {}

    ngOnInit() {
        this.refresh()
    }

    ngOnChanges(){
        this.monday = this.getMonday(this.currentDate)
    }

    getMonday(d: Date) {
        d = new Date(d);
        var day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
        return new Date(d.setDate(diff));
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
        this.monday = this.getMonday(this.currentDate)
        if(this.userService.isLoggedIn()){
            this.lessonsService.getLessonsForWeek(false, this.userService.getUser().group).subscribe((r) => {
                if(r.ok){
                    this.lessons = r.data!;
                }
            })
        }
    }
}

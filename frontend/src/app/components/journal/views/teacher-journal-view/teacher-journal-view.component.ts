import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WeekLessons, getMonday } from 'shared';
import { LessonClickData } from 'src/app/components/journal-day-toast/journal-day-toast.component';
import { LessonsService } from 'src/app/services/lessons.service';
import { UserService } from 'src/app/services/user.service';
import { LessonMarksDialogComponent } from './dialogs/lesson-marks-dialog/lesson-marks-dialog.component';
import { TotalMarksDialogComponent } from './dialogs/total-marks-dialog/total-marks-dialog.component';

@Component({
  selector: 'teacher-journal-view',
  templateUrl: './teacher-journal-view.component.html',
  styleUrls: ['./teacher-journal-view.component.scss']
})
export class TeacherJournalViewComponent {
    @Input()
    isSmallScreen: boolean = false

    lessons: WeekLessons = []

    monday: Date = new Date()

    currentDate: Date = new Date();
    currentTime: Date = new Date();

    constructor(private userService: UserService, private lessonsService: LessonsService, private dialog: MatDialog) {}

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
            this.lessonsService.getLessonsForTeacher(this.userService.getUser(), false).subscribe((r) => {
                if(r.ok){
                    this.lessons = r.data!;
                }
            })
        }
    }

    handleLessonClick(data: LessonClickData){
        const dialogRef = this.dialog.open(LessonMarksDialogComponent, {
            data: data
        })
    }

    openTotalMarks() {
        const dialogRef = this.dialog.open(TotalMarksDialogComponent, {
            
        })
        dialogRef.afterClosed().subscribe(data => {

        })
    }
}

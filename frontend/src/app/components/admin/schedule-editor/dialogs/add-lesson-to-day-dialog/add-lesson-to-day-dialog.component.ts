import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lesson, LessonOrder, User } from 'shared';
import { AccountsService } from 'src/app/services/accounts.service';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  selector: 'app-add-lesson-to-day-dialog',
  templateUrl: './add-lesson-to-day-dialog.component.html',
  styleUrls: ['./add-lesson-to-day-dialog.component.scss']
})
export class AddLessonToDayDialogComponent {
    
    lessons: Lesson[] = []
    teachers: User[] = []

    constructor(
        private lessonService: LessonsService,
        private accountService: AccountsService,
        public dialogRef: MatDialogRef<AddLessonToDayDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: LessonOrder,
    ) {}

    ngOnInit(){
        this.lessonService.getLessons().subscribe(data => {
            if(data.ok) {
                this.lessons = data.data!
            }
        })
        this.accountService.getTeacherAccounts().subscribe(data => {
            if(data.ok) {
                this.teachers = data.data!
            }
        })
    }
}

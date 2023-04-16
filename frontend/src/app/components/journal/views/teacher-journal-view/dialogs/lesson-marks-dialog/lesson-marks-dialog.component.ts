import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'shared';
import { AddAccountDialogComponent } from 'src/app/components/admin/account-manager/dialogs/add-account-dialog/add-account-dialog.component';
import { LessonClickData } from 'src/app/components/journal-day-toast/journal-day-toast.component';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-lesson-marks-dialog',
  templateUrl: './lesson-marks-dialog.component.html',
  styleUrls: ['./lesson-marks-dialog.component.scss']
})
export class LessonMarksDialogComponent {
    constructor(private groupService: GroupsService,
                public dialogRef: MatDialogRef<AddAccountDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: LessonClickData,
        ) {

    }

    students: User[] = []

    ngOnInit() {
        this.groupService.getGroupStudents(this.data.lesson.group).subscribe(data => {
            if(data.ok) {
                this.students = data.data!
            }
        })
    }
}

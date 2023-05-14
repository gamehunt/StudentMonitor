import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { JournalEntry, User } from 'shared';
import { AddAccountDialogComponent } from 'src/app/components/admin/account-manager/dialogs/add-account-dialog/add-account-dialog.component';
import { LessonClickData } from 'src/app/components/journal-day-toast/journal-day-toast.component';
import { GroupsService } from 'src/app/services/groups.service';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-lesson-marks-dialog',
  templateUrl: './lesson-marks-dialog.component.html',
  styleUrls: ['./lesson-marks-dialog.component.scss']
})
export class LessonMarksDialogComponent {
    constructor(private groupService: GroupsService,
                public dialogRef: MatDialogRef<AddAccountDialogComponent>,
                private journalService: JournalService,
                @Inject(MAT_DIALOG_DATA) public data: LessonClickData,
        ) {

    }

    students: User[] = []
    marks: JournalEntry[] = []

    ngOnInit() {
        this.groupService.getGroupStudents(this.data.lesson.group).subscribe(data => {
            if(data.ok) {
                this.students = data.data!
            }
            this.journalService.getMarksForGroup(this.data.lesson.group, this.data.date).subscribe(data => {
                if(data.ok) {
                    this.marks = data.data!
                }
                for(let e of this.students) {
                    if(!this.was(e)) {
                        this.journalService.updateMarks(e, this.data.date, this.data.lesson, false).subscribe(_ => {})
                    }
                }
            })
        })
    }

    updateMarks(data: MatSelectionListChange) {
        for(let f of data.options) {
            this.journalService.updateMarks(f.value as User, this.data.date, this.data.lesson, f.selected).subscribe(_ => {})
        }
    }

    was(student: User): boolean {
        return this.marks.find(e => e.student.id == student.id && e.lesson.id == this.data.lesson.id && e.was) != undefined
    }
}

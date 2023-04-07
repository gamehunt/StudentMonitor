import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'shared';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent {
    students: User[] = []

    constructor(
        private accountsSevice: AccountsService,
        public dialogRef: MatDialogRef<AddStudentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: User,
    ) {}

    ngOnInit(){
        this.accountsSevice.getStudentAccounts().subscribe(data => {
            if(data.ok) {
                this.students = data.data!.filter(s => !s.group);
            }
        })
    }
}

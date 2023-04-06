import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';

export interface DialogData {
    student: string
}

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent {
    constructor(
        private accountsSevice: AccountsService,
        public dialogRef: MatDialogRef<AddStudentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
}

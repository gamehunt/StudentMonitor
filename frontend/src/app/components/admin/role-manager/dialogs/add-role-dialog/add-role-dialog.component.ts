import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'shared';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss']
})
export class AddRoleDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AddRoleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Role,
    ) {}
}

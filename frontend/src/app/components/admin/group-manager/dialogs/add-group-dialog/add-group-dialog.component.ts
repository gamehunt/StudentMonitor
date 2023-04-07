import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'shared';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<AddGroupDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Group,
    ) {}

}

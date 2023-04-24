import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-total-marks-dialog',
  templateUrl: './total-marks-dialog.component.html',
  styleUrls: ['./total-marks-dialog.component.scss']
})
export class TotalMarksDialogComponent {
    constructor(public dialogRef: MatDialogRef<TotalMarksDialogComponent>) {}
}

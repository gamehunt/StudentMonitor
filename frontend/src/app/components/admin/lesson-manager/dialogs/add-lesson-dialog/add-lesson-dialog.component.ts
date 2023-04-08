import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Lesson } from 'shared';

@Component({
  selector: 'app-add-lesson-dialog',
  templateUrl: './add-lesson-dialog.component.html',
  styleUrls: ['./add-lesson-dialog.component.scss'],
})
export class AddLessonDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddLessonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lesson
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

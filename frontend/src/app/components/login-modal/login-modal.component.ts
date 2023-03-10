import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  login:    string;
  password: string;
}

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  constructor(public dialogRef: MatDialogRef<LoginModalComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

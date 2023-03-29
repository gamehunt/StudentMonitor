import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User, UserService } from 'src/app/services/user.service';
import { Response } from 'src/app/util/response';

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
  constructor(public dialogRef: MatDialogRef<LoginModalComponent>, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  isFailed: boolean = false

  login(){
    this.userService.login(this.data.login, this.data.password).subscribe((data: Response<User>) => {
        if(data.ok){
            this.dialogRef.close(data.data)
        }else{
            this.isFailed = true
        }
    })
  }
}

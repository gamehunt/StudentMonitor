import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'shared';
import { RolesService } from 'src/app/services/roles.service';

export interface DialogData {
    adding: boolean,
    username: string,
    password: string,
    fio: string,
    role: any
  }


@Component({
  selector: 'app-add-account-dialog',
  templateUrl: './add-account-dialog.component.html',
  styleUrls: ['./add-account-dialog.component.scss']
})
export class AddAccountDialogComponent {
    constructor(
        private rolesSevice: RolesService,
        public dialogRef: MatDialogRef<AddAccountDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    roles: Role[] = []

    ngOnInit(){
        this.rolesSevice.getRoles().subscribe(data => {
            if(data.ok){
                this.roles = data.data!
            }
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentDialogComponent } from './dialogs/add-student-dialog/add-student-dialog.component';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss', '../base-manager/base-manager.component.scss']
})
export class GroupManagerComponent {
    columns: string[] = [
        'index',
        'name',
        'actions'
    ]

    groups: any[] = []

    constructor(public dialog: MatDialog) {}

    addStudentToGroup(group: number){
        const dialogRef = this.dialog.open(AddStudentDialogComponent, {
            data: {},
        });
        dialogRef.afterClosed().subscribe(result => {

        });
    }
}

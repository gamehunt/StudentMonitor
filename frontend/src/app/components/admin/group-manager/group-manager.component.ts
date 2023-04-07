import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Group, User } from 'shared';
import { GroupsService } from 'src/app/services/groups.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddGroupDialogComponent } from './dialogs/add-group-dialog/add-group-dialog.component';
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

    groups: Group[] = []

    constructor(private groupsService: GroupsService, public dialog: MatDialog) {}

    ngOnInit() {
        this.refresh()
    }

    addStudentToGroup(group: number){
        const dialogRef = this.dialog.open(AddStudentDialogComponent, {
            data: {},
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.groupsService.addStudent(group, result.id).subscribe(data => {
                    let gr = this.groups.find(gr => gr.id == group)
                    if(!gr) {
                        return;
                    }
                    gr.students = gr.students.concat(result)
                })
            }
        });
    }

    deleteStudentFromGroup(group: number, student: number){
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            data: {},
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.groupsService.deleteStudent(group, student).subscribe(data => {
                    let gr = this.groups.find(gr => gr.id == group)
                    if(!gr) {
                        return;
                    }
                    gr.students = gr.students.filter(s => s.id != student)
                })
            }
        });
    }

    addGroup() {
        const dialogRef = this.dialog.open(AddGroupDialogComponent, {
            data: {},
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.groupsService.addGroup(result).subscribe(data => this.refresh())
            }
        });
    }

    deleteGroup(event: MouseEvent, id: number) {
        event.stopPropagation()
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
            text: 'Delete entry?'
        }})
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.groupsService.deleteGroup(id).subscribe(data => {
                    this.refresh()
                })
            }
        })
    }

    refresh(){
        this.groupsService.getGroups().subscribe(data => {
            if(data.ok) {
                this.groups = data.data!;
            }
        })
    }
}

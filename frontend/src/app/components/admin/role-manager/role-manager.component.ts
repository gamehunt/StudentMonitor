import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role, User } from 'shared';
import { RolesService } from 'src/app/services/roles.service';
import { BaseManagerComponent } from '../base-manager/base-manager.component';
import { AddRoleDialogComponent } from './dialogs/add-role-dialog/add-role-dialog.component';

export class RoleData {
    index!: number
    role!: Role
}

@Component({
    templateUrl: 'role-manager.component.html',
    styleUrls: ['role-manager.component.scss', '../base-manager/base-manager.component.scss']
})
export class RoleManagerComponent extends BaseManagerComponent {
    data: RoleData[] = []
    columns: string[] = [
        'index',
        'name',
        'permissions',
        'actions'
    ]

    constructor(private rolesService: RolesService, public override dialog: MatDialog){
        super(dialog)
    }

    refresh(): void { 
        this.rolesService.getRoles().subscribe(data => {
            if(data.ok){
                this.data = data.data?.map((e,i) => {return {index: i + 1, role: e}}) ?? []
            }
        })
    }

    add() {
        const dialogRef = this.dialog.open(AddRoleDialogComponent, {
            data: { },
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.rolesService.addRole(result).subscribe(result => this.refresh())
            }
        });
    }

    edit(data: any) {
        const dialogRef = this.dialog.open(AddRoleDialogComponent, {
            data: Object.assign({}, data.role),
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.rolesService.editRole(result).subscribe(result => this.refresh())
            }
        });
    }

    override delete(data: any) {
        this.rolesService.deleteRole(data.role.id).subscribe(data => this.refresh())
    }
}

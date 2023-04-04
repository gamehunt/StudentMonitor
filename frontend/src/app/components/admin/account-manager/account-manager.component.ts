import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, Response } from 'shared';
import { AccountsService } from 'src/app/services/accounts.service';
import { UserService } from 'src/app/services/user.service';
import { BaseManagerComponent, Layout } from '../base-manager/base-manager.component';
import { AddAccountDialogComponent } from './dialogs/add-account-dialog/add-account-dialog.component';

@Component({
  templateUrl: '../base-manager/base-manager.component.html',
  styleUrls: ['../base-manager/base-manager.component.scss']
})
export class AccountManagerComponent extends BaseManagerComponent {
    constructor(private userService: UserService, private accountsService: AccountsService, public override dialog: MatDialog){
        super(dialog)
    }

    override getLayout(): Layout | null { 
        return {columns: [
            {id: 'index',    name: '№'},
            {id: 'username', name: 'Логин'},
            {id: 'password', name: 'Пароль'},
            {id: 'fio',      name: 'Ф.И.О'},
            {id: 'role',     name: 'Роль'},
        ]}; 
    }

    override fetchData(): void { 
        if(!this.userService.isLoggedIn()){
            return;
        }
        this.accountsService.getAccounts().subscribe((data: Response<User[]>) => {
            if(data.ok){
                let e = data.data?.map((e, i) => [i + 1, e.username, e.password, e.fio, e.role.name]) ?? []
                this.data = e
            }
        })
    }

    override add() {
        const dialogRef = this.dialog.open(AddAccountDialogComponent, {
            data: {},
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.accountsService.addAccount(result).subscribe(result => this.refresh())
            }
        });
    }

    override delete(data: any) {
        this.accountsService.deleteAccount(data[1]).subscribe(data => this.refresh())
    }

    override edit(data: any) {
        const dialogRef = this.dialog.open(AddAccountDialogComponent, {
            data: {username: data[1], password: data[2], fio: data[3], role: data[4]},
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.accountsService.editAccount(result).subscribe(result => this.refresh())
            }
        });
    }
}

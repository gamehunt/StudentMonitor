import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, Response } from 'shared';
import { AccountsService } from 'src/app/services/accounts.service';
import { UserService } from 'src/app/services/user.service';
import { BaseManagerComponent } from '../base-manager/base-manager.component';
import { AddAccountDialogComponent } from './dialogs/add-account-dialog/add-account-dialog.component';

export class AccountData {
    index!: number
    user!: User
}

@Component({
  templateUrl: 'account-manager.component.html',
  styleUrls: ['account-manager.component.scss', '../base-manager/base-manager.component.scss']
})
export class AccountManagerComponent extends BaseManagerComponent {
    data: AccountData[] = []
    columns: string[] = [
        'index',
        'username',
        'fio',
        'role',
        'actions'
    ]

    constructor(private userService: UserService, 
                private accountsService: AccountsService, 
                public override dialog: MatDialog){
        super(dialog)
    }

    refresh(): void { 
        if(!this.userService.isLoggedIn()){
            return;
        }
        this.accountsService.getAccounts().subscribe((data: Response<User[]>) => {
            if(data.ok){
                this.data = data.data?.map((e, i) => {return {index: i + 1, user: e}}) ?? []
            }
        })
    }

    add() {
        const dialogRef = this.dialog.open(AddAccountDialogComponent, {
            data: { adding: true },
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.accountsService.addAccount(result).subscribe(result => this.refresh())
            }
        });
    }

    override delete(data: any) {
        this.accountsService.deleteAccount(data.user.username).subscribe(data => this.refresh())
    }

    edit(data: any) {
        const dialogRef = this.dialog.open(AddAccountDialogComponent, {
            data: {username: data['user']['username'], fio: data['user']['fio'], role: data['user']['role']['id']},
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.accountsService.editAccount(result).subscribe(result => this.refresh())
            }
        });
    }
}

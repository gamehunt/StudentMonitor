import { Component } from '@angular/core';
import { User, Response } from 'shared';
import { AccountsService } from 'src/app/services/accounts.service';
import { UserService } from 'src/app/services/user.service';
import { BaseManagerComponent, Layout } from '../base-manager/base-manager.component';

@Component({
  templateUrl: '../base-manager/base-manager.component.html',
  styleUrls: ['../base-manager/base-manager.component.scss']
})
export class AccountManagerComponent extends BaseManagerComponent {
    constructor(private userService: UserService, private accountsService: AccountsService){
        super()
    }

    override getLayout(): Layout | null { 
        return {columns: [
            {id: 'index', name: '№'},
            {id: 'username', name: 'Логин'},
            {id: 'password', name: 'Пароль'},
            {id: 'fio', name: 'Ф.И.О'},
            {id: 'role', name: 'Роль'},
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
}

import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent {
    constructor(private userSvc: UserService){}
    
    logout(){
        this.userSvc.logout().subscribe(() => {
            window.sessionStorage.removeItem('user')
            window.location.reload()
        })
    }

    getName(){
        if(!this.userSvc.isLoggedIn()){
            return ''
        }
        let fio = this.userSvc.getUser().name.split(" ");
        if(fio.length < 3){
            return fio[0]
        }
        return fio[0] + '.' + fio[1][0] + '.' + fio[2][0]
    }
}

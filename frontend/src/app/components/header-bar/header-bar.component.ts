import { Component } from '@angular/core';
import { ACCOUNT_MANAGMENT, checkPermissions, GROUP_MANAGMENT, LESSON_MANAGMENT, STUDENT_MANAGMENT } from 'shared';
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

    hasAccountManagment(){
        if(!this.userSvc.isLoggedIn()){
            return ''
        }
        return checkPermissions(this.userSvc.getUser().role, ACCOUNT_MANAGMENT)
    }

    hasGroupManagment(){
        if(!this.userSvc.isLoggedIn()){
            return ''
        }
        return checkPermissions(this.userSvc.getUser().role, GROUP_MANAGMENT)
    }

    hasLessonsManagment(){
        if(!this.userSvc.isLoggedIn()){
            return ''
        }
        return checkPermissions(this.userSvc.getUser().role, LESSON_MANAGMENT)
    }

    hasStudentManagment(){
        if(!this.userSvc.isLoggedIn()){
            return ''
        }
        return checkPermissions(this.userSvc.getUser().role, STUDENT_MANAGMENT)
    }

    getName() : string{
        if(!this.userSvc.isLoggedIn()){
            return ''
        }
        let fio = this.userSvc.getUser().fio.split(" ");
        if(fio.length < 3){
            return fio[0]
        }
        return fio[0] + '.' + fio[1][0] + '.' + fio[2][0]
    }

    getRole() : string{
        if(!this.userSvc.isLoggedIn()){
            return ''
        }
        return this.userSvc.getUser().role.name
    }
}

import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(){
    if(!this.userService.isLoggedIn()){
      let ref = this.openLoginModal()

      ref.afterClosed().subscribe(result => {
        this.userService.saveUser(result)
        window.location.reload()
      });
    }
  }

  openLoginModal(): MatDialogRef<LoginModalComponent> {
    return this.dialog.open(LoginModalComponent, {
      disableClose: true,
      ariaModal: true,
      backdropClass: "modal-backdrop",
      data: {
        login: "",
        password: ""
      }
    })
  }
}

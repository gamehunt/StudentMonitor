import { Component } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { isAdmin, isStudent, isTeacher } from 'shared';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent {
  smallScreen: boolean = false;

  constructor(private responsive: BreakpointObserver, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.responsive.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
        this.smallScreen = result.matches;
    });

    if(this.isAdmin()) {
        this.router.navigate(['/managment'])
    }
  }

  isLoggedIn() : boolean{
    return this.userService.isLoggedIn()
  }

  isStudent() : boolean{
    return isStudent(this.userService.getUser().role)
  }

  isTeacher() : boolean {
    return isTeacher(this.userService.getUser().role)
  }

  isAdmin() : boolean {
    return isAdmin(this.userService.getUser().role)
  }

  getView() : number {
    if(!this.isLoggedIn()){
        return 0;
    }
    if(this.isTeacher()) {
        return 1;
    }
    if(this.isStudent()) {
        return 2;
    }
    return -1;
  }
}

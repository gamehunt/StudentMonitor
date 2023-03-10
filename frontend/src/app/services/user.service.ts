import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  isLoggedIn(): boolean {
    return true
  }

  logIn(user: string, password: string){
    console.log(`Logging in with ${user} and ${password}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return false
  }

  logIn(user: string, password: string){
    console.log(`Logging in with ${user} and ${password}`)
    return this.http.post('/api/login', {username: user, password: password})
  }
}

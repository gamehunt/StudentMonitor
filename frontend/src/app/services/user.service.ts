import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Response } from '../util/response';

export class User{
    name!: string
    role!: any
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return window.sessionStorage.getItem('user') != null
  }

  login(user: string, password: string) : Observable<Response<User>>{
    console.log(`Logging in with ${user} and ${password}`)
    return this.http.post<Response<User>>('/api/login', {username: user, password: password})
  }

  saveUser(user: User){
    window.sessionStorage.setItem('user', JSON.stringify(user))
  }

  logout() {
    return this.http.post('/api/logout', {})
  }

  getUser(){
    let user: string | null = window.sessionStorage.getItem('user')
    return user ? JSON.parse(user) : undefined
  }
}

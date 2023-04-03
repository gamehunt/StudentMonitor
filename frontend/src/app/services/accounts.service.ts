import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response, User } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  getAccounts(){
    return this.http.get<Response<User[]>>('/api/users', { withCredentials: true })
  }
}

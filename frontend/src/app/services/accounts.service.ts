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

    deleteAccount(username: string) {
        return this.http.delete<Response<any>>(`/api/users/${username}`, { withCredentials: true })
    }

    addAccount(data: User) {
        return this.http.post<Response<any>>(`/api/users/${data.username}`, data, { withCredentials: true })
    }

    editAccount(data: User) {
        return this.http.patch<Response<any>>(`/api/users/${data.username}`, data, { withCredentials: true })
    }
}

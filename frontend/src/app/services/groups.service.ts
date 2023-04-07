import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, Response } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Response<Group[]>> {
    return this.http.get<Response<Group[]>>('/api/groups', { withCredentials: true })
  }

  addGroup(group: Group) : Observable<Response<void>> {
    return this.http.post<Response<void>>('/api/groups', group, { withCredentials: true })
  }

  deleteGroup(id: number) {
    return this.http.delete<Response<void>>(`/api/groups/${id}`, { withCredentials: true })
  }

  addStudent(group: number, student: number) {
    return this.http.post<Response<void>>(`/api/groups/${group}/students`, {id: student}, { withCredentials : true })
  }

  deleteStudent(group: number, student: number) {
    return this.http.delete<Response<void>>(`/api/groups/${group}/students/${student}`)
  }
}
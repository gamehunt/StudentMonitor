import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response, Role } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private http: HttpClient) { }

  getRoles(): Observable<Response<Role[]>> {
    return this.http.get<Response<Role[]>>('/api/roles', { withCredentials: true })
  }

  addRole(role: Role) {
    return this.http.post<Response<any>>('/api/roles', role, { withCredentials: true })
  }

  editRole(role: Role) {
    return this.http.patch<Response<any>>('/api/roles', role, { withCredentials: true })
  }

  deleteRole(id: number) {
    return this.http.delete<Response<any>>(`/api/roles/${id}`, { withCredentials: true })
  }
}

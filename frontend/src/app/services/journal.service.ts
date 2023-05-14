import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, JournalEntry, LessonOrder, User, Response, TotalMarks } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpClient) { }

  updateMarks(student: User, day: Date, lesson: LessonOrder, was: boolean) {
    return this.http.patch('/api/journal', {student: student.id, lesson: lesson.id, day: day.getTime(), was: was})
  }

  getMarksForGroup(group: Group, day: Date): Observable<Response<JournalEntry[]>> {
    return this.http.get<Response<JournalEntry[]>>(`/api/journal/groups/${group.id}/${day.getTime()}`)
  }

  getMarksForStudent(user: User, day: Date): Observable<Response<JournalEntry[]>> {
    return this.http.get<Response<JournalEntry[]>>(`/api/journal/students/${user.id}/${day.getTime()}`)
  }

  getTotalMarks(start: Date, end: Date, group: Group, user: User | undefined) {
    let query = `/api/journal/total/${group.id}?start=${start.getTime()}&end=${end.getTime()}`
    if(user){
        query += `&user=${user.id}`
    }
    return this.http.get<Response<TotalMarks>>(query)
  }
}

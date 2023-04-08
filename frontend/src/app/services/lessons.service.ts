import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson, Response } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  constructor(private http: HttpClient) { }

  getLessonsForDay(day: number, is_even: boolean): Observable<Response<Lesson[]>>{
    return this.http.get<Response<Lesson[]>>(`/api/lessons?day=${day}&is_even=${is_even}`)
  }

  getLessonsForWeek(is_even: boolean): Observable<Response<Lesson[][]>> {
    return this.http.get<Response<Lesson[][]>>(`/api/lessons?is_even=${is_even}`)
  }

  getLessons(): Observable<Response<Lesson[]>>{
    return this.http.get<Response<Lesson[]>>('/api/lessons');
  }

  addLesson(lesson: Lesson) {
    return this.http.post<Response<void>>('/api/lessons', lesson);
  }

  editLesson(lesson: Lesson) {
    return this.http.patch<Response<void>>(`/api/lessons/${lesson.id}`, lesson);
  }

  deleteLesson(id: number) {
    return this.http.delete<Response<void>>(`/api/lessons/${id}`);
  }
}

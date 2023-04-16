import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group, Lesson, LessonOrder, Response, User, WeekLessons } from 'shared';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  constructor(private http: HttpClient) { }

  getLessonsForDay(day: number, is_even: boolean, group: Group): Observable<Response<LessonOrder[]>>{
    return this.http.get<Response<LessonOrder[]>>(`/api/lessons?day=${day}&is_even=${is_even}&group=${group.id}`)
  }

  getLessonsForWeek(is_even: boolean, group: Group): Observable<Response<WeekLessons>> {
    return this.http.get<Response<WeekLessons>>(`/api/lessons?is_even=${is_even}&group=${group.id}`)
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

  addLessonToDay(lesson: LessonOrder) {
    return this.http.post<Response<void>>('/api/lessons/schedule', lesson);
  }

  deleteLessonFromDay(lesson: LessonOrder) {
    return this.http.delete<Response<void>>(`/api/lessons/schedule/${lesson.id}`)
  }

  editLessonFromDay(lesson: LessonOrder) {
    return this.http.patch<Response<void>>(`/api/lessons/schedule/${lesson.id}`, lesson)
  }

  getLessonsForTeacher(teacher: User, is_even: boolean) : Observable<Response<WeekLessons>>{
    return this.http.get<Response<WeekLessons>>(`/api/lessons/schedule/teacher/${teacher.id}`)
  }
}

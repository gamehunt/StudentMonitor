import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Lesson {
    name!: string
}

export type LessonQueryResult = (Lesson | null)[]

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  constructor(private http: HttpClient) { }

  getLessonsForDay(day: number, is_even: boolean): Observable<LessonQueryResult>{
    return this.http.get<LessonQueryResult>(`/api/lessons?day=${day}&is_even=${is_even}`)
  }

  getLessons(is_even: boolean): Observable<LessonQueryResult[]> {
    return this.http.get<LessonQueryResult[]>(`/api/lessons?is_even=${is_even}`)
  }
}

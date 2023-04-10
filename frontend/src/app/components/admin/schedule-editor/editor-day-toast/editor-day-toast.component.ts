import {
  CdkDragDrop, moveItemInArray, transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LessonOrder } from 'shared';
import { AddLessonToDayDialogComponent } from '../dialogs/add-lesson-to-day-dialog/add-lesson-to-day-dialog.component';

@Component({
  selector: 'editor-day-toast',
  templateUrl: './editor-day-toast.component.html',
  styleUrls: ['./editor-day-toast.component.scss'],
})
export class EditorDayToastComponent {
  @Input()
  day: number = 0;

  @Input()
  lessons: (LessonOrder | null)[] = [];

  @Output()
  onLessonAdd: EventEmitter<LessonOrder> = new EventEmitter();

  @Output()
  onLessonDelete: EventEmitter<LessonOrder> = new EventEmitter();

  @Output()
  onLessonEdit: EventEmitter<LessonOrder> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  addLesson() {
    const dialogRef = this.dialog.open(AddLessonToDayDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result: LessonOrder) => {
      if (result) {
        result.day = this.day;
        result.order = this.lessons.length;
        this.onLessonAdd.emit(result);
      }
    });
  }

  getDayName() {
    let baseDate = new Date(Date.UTC(2023, 3, 10)); // just a Monday
    baseDate.setDate(baseDate.getDate() + this.day);
    let weekDay = baseDate.toLocaleDateString('ru-RU', { weekday: 'long' });
    return weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
  }

  delete(data: LessonOrder | null) {
    if (data) {
      this.onLessonDelete.emit(data);
    }
  }

  rearrangeLessons(event: CdkDragDrop<(LessonOrder | null)[]>) {
    let lessons = event.container.data
    if(event.previousContainer != event.container) {
        let otherLessons = event.previousContainer.data
        transferArrayItem(otherLessons, lessons, event.previousIndex, event.currentIndex)
        for(let i = 0; i < otherLessons.length; i++) {
            let lesson = otherLessons[i]
            if(lesson && lesson.order != i){
                lesson.order = i;
                this.onLessonEdit.emit(lesson)
            }
        }
    }else{
        moveItemInArray(lessons, event.previousIndex, event.currentIndex)
    }
    setTimeout(() => {
        for(let i = 0; i < lessons.length; i++) {
            let lesson = lessons[i]
            if(lesson && lesson.order != i){
                lesson.order = i;
                lesson.day = this.day;
                this.onLessonEdit.emit(lesson)
            }
        }
    }, 5)
  }
}

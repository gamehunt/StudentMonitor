import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lesson } from 'shared';
import { LessonsService } from 'src/app/services/lessons.service';
import { BaseManagerComponent } from '../base-manager/base-manager.component';
import { AddLessonDialogComponent } from './dialogs/add-lesson-dialog/add-lesson-dialog.component';

@Component({
  selector: 'app-lesson-manager',
  templateUrl: './lesson-manager.component.html',
  styleUrls: ['./lesson-manager.component.scss', '../base-manager/base-manager.component.scss']
})
export class LessonManagerComponent extends BaseManagerComponent{
    data: Lesson[] = []

    columns: string[] = [
        'index',
        'name',
        'actions'
    ]

    constructor(private lessonsService: LessonsService, override dialog: MatDialog){
        super(dialog)
    }

    refresh() {
        this.lessonsService.getLessons().subscribe(data => {
            if(data.ok) {
                this.data = data.data!
            }
        })
    }

    override delete(data: Lesson) {
        this.lessonsService.deleteLesson(data.id).subscribe(data => {
            this.refresh()
        })
    }

    add() {
        const dialogRef = this.dialog.open(AddLessonDialogComponent, {
            data: {}
        })
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.lessonsService.addLesson(result).subscribe(data => {
                    this.refresh()
                })
            }
        })
    }

    edit(data: Lesson) {
        const dialogRef = this.dialog.open(AddLessonDialogComponent, {
            data: Object.assign({}, data)
        })
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.lessonsService.editLesson(result).subscribe(data => {
                    this.refresh()
                })
            }
        })
    }
}

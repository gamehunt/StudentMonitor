import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseManagerComponent } from '../base-manager/base-manager.component';

@Component({
  selector: 'app-lesson-manager',
  templateUrl: './lesson-manager.component.html',
  styleUrls: ['./lesson-manager.component.scss', '../base-manager/base-manager.component.scss']
})
export class LessonManagerComponent extends BaseManagerComponent{
    data: any[] = []
    columns: string[] = [
        'index',
        'name',
        'teacher',
        'actions'
    ]

    constructor(override dialog: MatDialog){
        super(dialog)
    }

    edit(id: number) {
        
    }
}

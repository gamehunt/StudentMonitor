import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JournalService } from 'src/app/services/journal.service';

@Component({
  selector: 'app-total-marks-dialog',
  templateUrl: './total-marks-dialog.component.html',
  styleUrls: ['./total-marks-dialog.component.scss']
})
export class TotalMarksDialogComponent {
    constructor(public dialogRef: MatDialogRef<TotalMarksDialogComponent>, private journalSvc: JournalService) {}

    dataSource = [
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
        {position: 1, name: 'A B C', date: 'W'},
    ]

    ngOnInit() {
        
    }

    resetStart() {}
    resetEnd() {}

    formatLabel(value: number): string {
        if (value >= 1000) {
          return Math.round(value / 1000) + 'k';
        }
    
        return `${value}`;
      }
}

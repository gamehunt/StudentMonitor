import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'base-manager',
  templateUrl: './base-manager.component.html',
  styleUrls: ['./base-manager.component.scss']
})
export class BaseManagerComponent {

    @Output() onRefresh = new EventEmitter<void>();
    @Output() onAdd     = new EventEmitter<void>();
    @Output() onDelete  = new EventEmitter<any>();

    constructor(public dialog: MatDialog) {}

    ngOnInit(){
        this._refresh()
    }

    _delete(data: any) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {
            text: 'Delete entry?'
        }})
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.delete(data)
            }
        })
    }

    delete(data: any) {}

    _add() {
        this.onAdd.emit()
    }

    _refresh(){
        this.onRefresh.emit()
    }
}

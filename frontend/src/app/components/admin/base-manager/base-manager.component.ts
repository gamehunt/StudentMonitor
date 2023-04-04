import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

export class Column {
    id!: string
    name!: string
}
export type Columns = Column[];
export class Layout {
    columns!: Columns;
}

@Component({
  templateUrl: './base-manager.component.html',
  styleUrls: ['./base-manager.component.scss']
})
export class BaseManagerComponent {
    data: any[][] = []

    constructor(public dialog: MatDialog) {}

    getLayout(): Layout | null { return null; }
    fetchData(): void { this.data = [] }

    getColumns() : Columns {
        return this.getLayout()?.columns ?? []
    }

    getColumnIds() : string[] {
        let columns = this.getColumns().map(c => c.id)
        columns.push('actions')
        return columns
    }

    ngOnInit(){
        this.refresh()
    }

    refresh(){
        this.fetchData()
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

    add() {}
    edit(data: any) {}
    delete(data: any) {}
}

import { Component } from '@angular/core';

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

    add() {}
    edit(data: any) {}
}

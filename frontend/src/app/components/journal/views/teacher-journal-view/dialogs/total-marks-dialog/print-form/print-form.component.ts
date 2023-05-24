import { Component, Inject } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from 'shared';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-print-form',
  templateUrl: './print-form.component.html',
  styleUrls: ['./print-form.component.scss']
})
export class PrintFormComponent {
    constructor(private route: ActivatedRoute, private printSvc: PrintService, @Inject(MAT_DATE_LOCALE) public _locale: string) {}

    data: any = {}

    formatDate(date: any){
        return formatDate(date, this._locale)
    }

    ngOnInit() {
        this.data = JSON.parse(this.route.snapshot.params['data'])
        this.printSvc.endPrint()
    }
}

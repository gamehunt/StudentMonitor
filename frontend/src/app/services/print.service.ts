import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor(private router: Router) { }

  inPrint: boolean = false
  returnRoute: string = ''

  print(document: string, data: string, returnRoute: string) {
    this.inPrint = true
    this.returnRoute = returnRoute
    localStorage.setItem('printData', data)
    this.router.navigate(['/_',
    { outlets: {
      'print': ['print', document]
    }}]);
  }

  getPrintData() {
    return localStorage.getItem('printData') ?? '{}'
  }

  endPrint() {
    this.inPrint = false;
    setTimeout(() => {
      window.print();
      this.router.navigate([this.returnRoute, { outlets: { print: null }}]);
    });
  }
}

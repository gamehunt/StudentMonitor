import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent {
  smallScreen: boolean = false;
  currentDate: Date = new Date();

  constructor(private responsive: BreakpointObserver,
              private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.responsive.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
        this.smallScreen = result.matches;
    });
  }

  getMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  offsetDate(d: Date, amount: number){
    d.setDate(d.getDate() + amount);
    return d;
  }

  reset(){
    this.currentDate = new Date()
  }
}

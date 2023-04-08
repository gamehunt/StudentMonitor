import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Group } from 'shared';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.scss']
})
export class ScheduleEditorComponent {
    groups: Group[] = []

    currentGroup: Group | null = null

    smallScreen: boolean  = false;
    mediumScreen: boolean = false;

    constructor(private groupService: GroupsService, private responsive: BreakpointObserver) {}

    ngOnInit() {
        this.responsive.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
            this.smallScreen = result.matches;
        });
        this.responsive.observe([Breakpoints.Medium]).subscribe((result) => {
            this.mediumScreen = result.matches;
        });
        this.groupService.getGroups().subscribe(data => {
            if(data.ok){
                this.groups = data.data!
            }
        })
    }

    getColumnAmount(){
        if(this.smallScreen) {
            return 1;
        }
        if(this.mediumScreen){
            return 2;
        }
        return 3;
    }
}

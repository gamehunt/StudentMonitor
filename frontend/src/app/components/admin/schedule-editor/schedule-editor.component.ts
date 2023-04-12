import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Group, LessonOrder, WeekLessons } from 'shared';
import { GroupsService } from 'src/app/services/groups.service';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.scss']
})
export class ScheduleEditorComponent{
    groups: Group[] = []
    lessons: WeekLessons = []

    isEven: boolean = false

    currentGroup: Group | null = null

    smallScreen: boolean  = false;
    mediumScreen: boolean = false;

    constructor(private groupService: GroupsService, private lessonService: LessonsService, private responsive: BreakpointObserver) {}

    ngOnInit() {
        this.responsive.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((result) => {
            this.smallScreen = result.matches;
        });
        this.responsive.observe([Breakpoints.Medium]).subscribe((result) => {
            this.mediumScreen = result.matches;
        });
        this.groupService.getGroups().subscribe(data => {
            if(data.ok){
                this.groups = data.data!.sort((a, b) => a.name.localeCompare(b.name))
            }
        })
    }

    refresh() {
        if(this.currentGroup) {
            this.lessonService.getLessonsForWeek(this.isEven, this.currentGroup).subscribe(data => {
                if(data.ok){
                    this.lessons = data.data!
                }
            })
        }
    }

    addLessonToDay(result: LessonOrder) {
        result.group = this.currentGroup!;
        result.is_even = this.isEven;
        this.lessonService.addLessonToDay(result).subscribe(_ => this.refresh())
    }

    deleteLessonFromDay(data: LessonOrder) {
        this.lessonService.deleteLessonFromDay(data).subscribe(_ => this.refresh())
    }

    editLessonFromDay(data: LessonOrder) {
        this.lessonService.editLessonFromDay(data).subscribe(_ => this.refresh())
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

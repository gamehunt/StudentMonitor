import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Group, LessonOrder } from 'shared';
import { GroupsService } from 'src/app/services/groups.service';
import { LessonsService } from 'src/app/services/lessons.service';

@Component({
  templateUrl: './schedule-editor.component.html',
  styleUrls: ['./schedule-editor.component.scss']
})
export class ScheduleEditorComponent{
    groups: Group[] = []
    lessons: LessonOrder[] = []

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

    // This makes next:
    // 1) Filters out all lessons with invalid day
    // 2) Fills order gaps with nulls, so we have empty lessons. For example [1, 3, 5] => [1, null, 3, null, 5]
    getLessonsForDay(day: number) {
        let lessons = this.lessons.filter(l => l.day == day)
        if(lessons.length > 0) {
            return Array.from(Array(Math.max(...lessons.map(e => e.order)) + 1).keys()).map(idx => lessons.find(e => e.order == idx) || null)
        }
        return lessons
    }
}

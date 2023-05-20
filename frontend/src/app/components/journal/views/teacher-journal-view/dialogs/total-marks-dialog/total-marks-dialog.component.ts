import { Component, Inject } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Group, JournalEntry, Lesson, LessonOrder, TotalMarks, User, WeekLessons, Response } from 'shared';
import { JournalService } from 'src/app/services/journal.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-total-marks-dialog',
  templateUrl: './total-marks-dialog.component.html',
  styleUrls: ['./total-marks-dialog.component.scss']
})
export class TotalMarksDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<TotalMarksDialogComponent>, 
        @Inject(MAT_DATE_LOCALE) private _locale: string,
        private journalSvc: JournalService, 
        private usersSvc: UserService,
        private lessonsSvc: LessonsService
        ) {}

    dataSource: any[] = []

    journal: TotalMarks | null = null
    lessons: LessonOrder[] = []

    currentLesson: Lesson | null = null
    currentGroup: Group | null = null

    start: Date = this.currentStart()
    end: Date   = this.currentEnd()

    currentPage: number = 0

    currentStart() : Date {
        let curDate = new Date()
        if(curDate.getMonth() >= 8) {
            return new Date(curDate.getFullYear(), 8, 1)
        }
        return new Date(curDate.getFullYear(), 0, 1)
    }

    currentEnd() {
        let curDate = new Date()
        if(curDate.getMonth() >= 8) {
            return new Date(curDate.getFullYear(), 11, 31)
        }
        return new Date(curDate.getFullYear(), 5, 20)
    }

    isCurrentDate(d: Date) {
        d       = new Date(d)
        let cur = new Date()
        return cur.getFullYear() == d.getFullYear()
               && cur.getMonth() == d.getMonth()
               && cur.getDate()  == d.getDate()
    }

    getDates(): Date[] {
        let id = this.journal?.marks[0].student.id
        return this.journal?.marks.filter(e => e.student.id == id).map(e => e.date).sort() ?? []
    }

    getStudents(): User[] {
        return this.journal?.marks.map(e => e.student).unique((a, b) => a.id == b.id) ?? []
    }

    was(date: Date, user: User): boolean {
        return (this.journal?.marks.findIndex(e => e.date == date && e.student.id == user.id) ?? 0) > 0
    }

    getGroups(): Group[] {
        return this.lessons.map(e => e.group)
        .unique((a, b) => a.id == b.id)
    }

    getLessons(): Lesson[] {
        return this.lessons.filter(e => this.currentGroup != null && e.group.id == this.currentGroup.id)
        .map(e => e.lesson)
        .unique((a, b) => a.id == b.id)
    }

    ngOnInit() {
        this.lessonsSvc.getLessonsForTeacher(this.usersSvc.getUser(), false).subscribe((data: Response<WeekLessons>) => {
            this.lessons = data.data?.flat().filter(e => e != null) as LessonOrder[] ?? []
            let g = this.getGroups()
            if(g.length == 1) {
                this.currentGroup = g[0]
            }
            let l = this.getLessons()
            if(l.length == 1) {
                this.currentLesson = l[0]
            }
            if(this.currentGroup && this.currentLesson) {
                this.fetchData()
            }
        })
    }

    fetchData() {
        this.journalSvc.getTotalMarks(this.start, this.end, this.currentGroup!, this.currentLesson!).subscribe((data: Response<TotalMarks>) => {
            if(data.ok) {
                this.journal = data.data!
                
                let result = []
                let n = 0

                let dates = this.getDates()
                let cur   = new Date()

                let curPage = 0

                if(dates.length > 6) {
                    for(let i = 0; i < dates.length; i += 6) {
                        let f = false
                        curPage = Math.ceil(i / 6)
                        for(let j = 0; j < 6; j++) {
                            if(dates[i + j] >= cur) {
                                f = true
                                break;
                            }
                        }
                        if(f) {
                            break
                        }
                    }
                }

                for(let s of this.getStudents()) {
                    n += 1
                    result.push({position: n, student: s, was: dates.slice(curPage * 6, curPage * 6 + 6).map(d => this.was(d, s))})
                }

                this.currentPage = curPage
                this.dataSource = result
            }
        })
    }

    getDatesForCurrentPage() {
        let d : any = this.getDates().slice(this.currentPage * 6, this.currentPage * 6 + 6)
        while(d.length < 6) {
            d.push(false)
        }
        return d
    }

    resetStart() {
        this.start = this.currentStart()
    }
    resetEnd() {
        this.end = this.currentEnd()
    }

    formatDate(d: Date)
    {
        if(!d) {
            return ""
        }
        return new Date(d).toLocaleDateString(this._locale, { year: 'numeric', day: 'numeric', month: 'numeric' })
    }

    getDateAmount() {
        return this.getDates().length
    }

    changePage(e: PageEvent) {
        let result: any = []
        let n = 0
        let dates = this.getDates()
        for(let s of this.getStudents()) {
            n += 1
            result.push({position: n, student: s, was: dates.slice(e.pageIndex * 6, e.pageIndex * 6 + 6).map(d => this.was(d, s))})
        }
        this.currentPage = e.pageIndex
        this.dataSource = result
    }
}

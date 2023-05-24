import { Component, Inject } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import {
  Group,
  JournalEntry,
  Lesson,
  LessonOrder,
  TotalMarks,
  User,
  WeekLessons,
  Response,
  formatDate,
} from 'shared';
import { JournalService } from 'src/app/services/journal.service';
import { LessonsService } from 'src/app/services/lessons.service';
import { PrintService } from 'src/app/services/print.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-total-marks-dialog',
  templateUrl: './total-marks-dialog.component.html',
  styleUrls: ['./total-marks-dialog.component.scss'],
})
export class TotalMarksDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TotalMarksDialogComponent>,
    @Inject(MAT_DATE_LOCALE) public _locale: string,
    private journalSvc: JournalService,
    private usersSvc: UserService,
    private lessonsSvc: LessonsService,
    private printSvc: PrintService
  ) {}

  dataSource: any[] = [];

  journal: TotalMarks | null = null;
  lessons: LessonOrder[] = [];

  currentLesson: Lesson | null = null;
  currentGroup: Group | null = null;

  start: Date = this.currentStart();
  end: Date = this.currentEnd();

  currentPage: number = 0;

  skips: any = {};


  formatDate(date: any) {
    return formatDate(date, this._locale)
  }

  currentStart(): Date {
    let curDate = new Date();
    if (curDate.getMonth() >= 8) {
      return new Date(curDate.getFullYear(), 8, 1);
    }
    return new Date(curDate.getFullYear(), 0, 1);
  }

  currentEnd() {
    let curDate = new Date();
    if (curDate.getMonth() >= 8) {
      return new Date(curDate.getFullYear(), 11, 31);
    }
    return new Date(curDate.getFullYear(), 5, 20);
  }

  isCurrentDate(d: Date) {
    d = new Date(d);
    let cur = new Date();
    return (
      cur.getFullYear() == d.getFullYear() &&
      cur.getMonth() == d.getMonth() &&
      cur.getDate() == d.getDate()
    );
  }

  getDates(): Date[] {
    let id = this.journal?.marks[0].student.id;
    return (
      this.journal?.marks
        .filter((e) => e.student.id == id)
        .map((e) => e.date)
        .sort() ?? []
    );
  }

  getStudents(): User[] {
    return (
      this.journal?.marks
        .map((e) => e.student)
        .unique((a, b) => a.id == b.id) ?? []
    );
  }

  was(date: Date, user: User): boolean {
    let skipIndex = `${user.id}${new Date(date).getTime()}`;
    if (!(skipIndex in this.skips)) {
      this.skips[skipIndex] = 0;
    }
    let result =
      this.journal?.marks.filter(
        (e) => e.date == date && e.student.id == user.id
      )[this.skips[skipIndex]]?.was ?? false;
    this.skips[skipIndex]++;
    return result;
  }

  getGroups(): Group[] {
    return this.lessons.map((e) => e.group).unique((a, b) => a.id == b.id);
  }

  getLessons(): Lesson[] {
    return this.lessons
      .filter(
        (e) => this.currentGroup != null && e.group.id == this.currentGroup.id
      )
      .map((e) => e.lesson)
      .unique((a, b) => a.id == b.id);
  }

  ngOnInit() {
    this.lessonsSvc
      .getLessonsForTeacher(this.usersSvc.getUser(), false)
      .subscribe((data: Response<WeekLessons>) => {
        this.lessons =
          (data.data?.flat().filter((e) => e != null) as LessonOrder[]) ?? [];
        let g = this.getGroups();
        if (g.length == 1) {
          this.currentGroup = g[0];
        }
        let l = this.getLessons();
        if (l.length == 1) {
          this.currentLesson = l[0];
        }
        if (this.currentGroup && this.currentLesson) {
          this.fetchData();
        }
      });
  }

  sliceData(pageNumber: number) {
    let result = [];
    this.skips = {};
    let dates = this.getDates();
    let n = 0;
    for (let s of this.getStudents()) {
      n += 1;
      if(pageNumber < 0) {
        result.push({
            position: n,
            student: s,
            was: dates
              .map((d) => this.was(d, s)),
          });
      }else{
        result.push({
            position: n,
            student: s,
            was: dates
              .slice(pageNumber * 6, pageNumber * 6 + 6)
              .map((d) => this.was(d, s)),
          });
      }
    }

    this.skips = {};
    result = result.map((e: any) => {
      e['missed'] =
        dates.map((d) => this.was(d, e.student)).filter((ee) => !ee).length * 2;
      return e;
    });
    return result;
  }

  fetchData() {
    this.journalSvc
      .getTotalMarks(
        this.start,
        this.end,
        this.currentGroup!,
        this.currentLesson!
      )
      .subscribe((data: Response<TotalMarks>) => {
        if (data.ok) {
          this.journal = data.data!;

          let dates = this.getDates();
          let cur = new Date();
          let curPage = 0;

          if (dates.length > 6) {
            for (let i = 0; i < dates.length; i += 6) {
              let f = false;
              curPage = Math.ceil(i / 6);
              for (let j = 0; j < 6; j++) {
                if (dates[i + j] >= cur) {
                  f = true;
                  break;
                }
              }
              if (f) {
                break;
              }
            }
          }

          this.currentPage = curPage;
          this.dataSource = this.sliceData(this.currentPage);
        }
      });
  }

  getDatesForCurrentPage() {
    let d: any = this.getDates().slice(
      this.currentPage * 6,
      this.currentPage * 6 + 6
    );
    while (d.length < 6) {
      d.push(false);
    }
    return d;
  }

  resetStart() {
    this.start = this.currentStart();
  }
  resetEnd() {
    this.end = this.currentEnd();
  }

  getDateAmount() {
    return this.getDates().length;
  }

  changePage(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.dataSource = this.dataSource = this.sliceData(this.currentPage);;
  }

  print() {
    this.dialogRef.close();
    let data: any = {data: this.sliceData(-1), dates: this.getDates()}
    this.printSvc.print('total_marks', JSON.stringify(data), '/journal');
  }
}

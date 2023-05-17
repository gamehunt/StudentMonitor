export const ADMIN             = (1 << 0);
export const GROUP_MANAGMENT   = (1 << 1);
export const LESSON_MANAGMENT  = (1 << 2);
export const STUDENT           = (1 << 3);
export const ACCOUNT_MANAGMENT = (1 << 4);
export const ROLE_MANAGMENT    = (1 << 5);
export const TEACHER           = (1 << 6);

export class Response <T> {
    ok!: boolean
    data?: T
    message?: any
}

export class Role {
    id!: number
    name!: string
    permissions!: number
}

export class User{
    id!: number
    username!: string
    fio!: string
    role!: Role
    group!: Group
}

export class Group {
    id!: number
    name!: string
    students!: User[]
}

export class Lesson {
    id!: number
    name!: string
}

export class LessonOrder {
    id!: number
    day!: number
    order!: number
    lesson!: Lesson
    teacher!: User
    group!: Group
    is_even!: boolean
}

export class JournalEntry {
    date!: Date
    lesson!: LessonOrder
    student!: User
    was!: boolean
}

export class TotalMarks {
    marks!:        JournalEntry[]
    total_missed!: number
}

export type DayLessons  = (LessonOrder | null) []
export type WeekLessons = DayLessons []

export function isAdmin(roleOrPerms: Role | number) : boolean {
    if(typeof roleOrPerms === 'number'){
        return (roleOrPerms & ADMIN) != 0;
    }
    return isAdmin(roleOrPerms.permissions)
}

export function isStudent(roleOrPerms : Role | number) : boolean {
    if(typeof roleOrPerms === 'number'){
        return (roleOrPerms & STUDENT) != 0;
    }
    return isStudent(roleOrPerms.permissions)
}

export function isTeacher(roleOrPerms : Role | number) : boolean {
    if(typeof roleOrPerms === 'number'){
        return (roleOrPerms & TEACHER) != 0;
    }
    return isTeacher(roleOrPerms.permissions)
}

export function checkPermissions(roleOrPerms: Role | number, permissions: number): boolean {
    if (isAdmin(roleOrPerms)){
        return true;
    }
    if(typeof roleOrPerms === 'number'){
        return (roleOrPerms & permissions) != 0;
    }
    return (roleOrPerms.permissions & permissions) != 0;
}

export function getMonday(d: Date): Date {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    let date = new Date(d.setDate(diff))
    date.setHours(0, 0, 0, 0);
    return date;
}

export function timestampToDate(timestamp: string | number) : Date {
    if(typeof timestamp === 'number') {
        return new Date(timestamp)
    }
    return timestampToDate(parseInt(timestamp))
}

declare global {
    interface Array<T> {
        unique(equalityPredicate?: (a: T, b: T) => boolean): Array<T>;
    }
  }
  
  if (!Array.prototype.unique) {
    Array.prototype.unique = function<T>(this: T[], pred?: (a: T, b: T) => boolean): T[] {
      return this.filter((e, i, a) => a.findIndex(ee => (pred ? pred(e, ee) : ee == e)) == i);
    }
  }
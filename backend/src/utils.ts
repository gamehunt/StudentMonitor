import { WeekLessons } from "shared";
import { LessonOrder } from "./entity/LessonOrder";

export function toBoolean(value: string) {
    switch(value?.toLowerCase()?.trim()){
        case "true":
        case "1":
        case "yes":
            return true;
        default:
            return false;
    }
}

export function sparseArray(lessons: LessonOrder[]) {
    let result: WeekLessons = []
    for(let i = 0; i <= 5; i++) {
        result.push(lessons.filter(e => e.day == i))
        if(result[i].length > 0) {
            // Fills order gaps with nulls, so we have empty lessons. For example [1, 3, 5] => [1, null, 3, null, 5]
            result[i] = Array.from(Array(Math.max(...result[i].map(e => e.order)) + 1).keys()).map(idx => result[i].find(e => e.order == idx) || null)
        }
    }
    return result;
}
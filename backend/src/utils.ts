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
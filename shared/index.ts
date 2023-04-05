export class Response <T> {
    ok!: boolean
    data?: T
    message?: any
}

export const ADMIN             = (1 << 0);
export const GROUP_MANAGMENT   = (1 << 1);
export const LESSON_MANAGMENT  = (1 << 2);
export const STUDENT_MANAGMENT = (1 << 3);
export const ACCOUNT_MANAGMENT = (1 << 4);
export const ROLE_MANAGMENT    = (1 << 5);

export class Role {
    id!: number
    name!: string
    permissions!: number
}

export function isAdmin(roleOrPerms: Role | number) : boolean {
    if(typeof roleOrPerms === 'number'){
        return (roleOrPerms & ADMIN) != 0;
    }
    return isAdmin(roleOrPerms.permissions)
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

export class User{
    id!: number
    username!: string
    fio!: string
    role!: Role
}


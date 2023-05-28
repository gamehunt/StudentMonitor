import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { ACCOUNT_MANAGMENT, ADMIN, GROUP_MANAGMENT, LESSON_MANAGMENT, PERMISSION_LIST, ROLE_MANAGMENT, STUDENT, TEACHER } from 'shared';

@Component({
  selector: 'permission-editor',
  templateUrl: './permission-editor.component.html',
  styleUrls: ['./permission-editor.component.scss']
})
export class PermissionEditorComponent {
    @Input()
    permissions: number = 0

    @Output() permissionsChange = new EventEmitter<number>();

    getPermissions() {
        return PERMISSION_LIST
    }

    permissionToString(perm: number) {
        switch(perm) {
            case ADMIN:
                return "ADMIN";
            case GROUP_MANAGMENT:
                return "GROUP_MANAGMENT";
            case LESSON_MANAGMENT:
                return "LESSON_MANAGMENT";
            case STUDENT:
                return "STUDENT";
            case ACCOUNT_MANAGMENT:
                return "ACCOUNT_MANAGMENT";
            case ROLE_MANAGMENT:
                return "ROLE_MANAGMENT";
            case TEACHER:
                return "TEACHER";
        }
        return "UNKNOWN"
    }

    has(perm: number) {
        return (this.permissions & perm) != 0
    }

    updatePermissions(e: MatSelectionListChange) {
        for(let opt of e.options) {
            if(opt.selected) {
                this.permissions |= opt.value
            }else{
                this.permissions &= ~opt.value
            }
        }
        this.permissionsChange.emit(this.permissions);
    }
}

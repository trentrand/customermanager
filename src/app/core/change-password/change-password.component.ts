import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'core-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    error: string;
    success: string;
    passwordFormModel: any = {};
    passwordErrors: string[] = [];

    constructor() {
    }

    ngOnInit() {

    }

    public testPassword = () => {
    }

    public changePassword = (isValid: boolean) => {
        this.success = this.error = null;
    }
}

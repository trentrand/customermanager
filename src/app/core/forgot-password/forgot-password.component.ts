import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'core-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    error: string;
    success: string;
    email = '';

    constructor() {
    }

    ngOnInit() {

    }

    public requestPasswordReset = (email: string) => {
      this.success = this.error = null;
    }
}

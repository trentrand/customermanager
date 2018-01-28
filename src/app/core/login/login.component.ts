import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'core-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  passReset: boolean = false;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
   this.buildForm();
  }

  login(): void {
   this.auth.emailLogin(
     this.userForm.value['email'], this.userForm.value['password']
   ).then(
     success => {
       console.log(success)
     }
   )
  }

  resetPassword() {
   this.auth.resetPassword(this.userForm.value['email'])
   .then(() => this.passReset = true)
  }

  buildForm(): void {
   this.userForm = this.fb.group({
     'email': ['', [
         Validators.required,
         Validators.email
       ]
     ],
     'password': ['', [
       Validators.minLength(6),
       Validators.maxLength(45)
     ]
   ],
   });

   this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
   this.onValueChanged();
  }

  onValueChanged(data?: any) {
   if (!this.userForm) { return; }
   const form = this.userForm;
   for (const field in this.formErrors) {
     // clear previous error message (if any)
     this.formErrors[field] = '';
     const control = form.get(field);
     if (control && control.dirty && !control.valid) {
       const messages = this.validationMessages[field];
       for (const key in control.errors) {
         this.formErrors[field] += messages[key] + ' ';
       }
     }
   }
  }

  formErrors = {
    'email': '',
    'password': ''
  };

  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    }
  };
}

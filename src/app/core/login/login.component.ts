import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'core-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error: string;

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  public login = (email: string, password: string) => {
    // this.auth.fetchAuthenticationToken(email, password).then(
    //     token => {
    //       // this.authorization = new AuthorizationToken(token);
    //       // this.router.navigate(['/home']);
    //       console.log(token)
    //     },
    //     error => {
    //       this.error = error.error;
    //       console.log(error);
    //     }
    // );
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';
import { AuthService } from '@core/auth.service';

@Component({
  selector: 'core-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title: string;
  description: string;
  getStartedRoute: string;
  registerButton: boolean;

  constructor(private titleService: Title, private auth: AuthService) {
    this.getStartedRoute = '/dashboard'
    this.title = this.titleService.getTitle()
    this.description = environment.description
  }

  ngOnInit() {
  }
}

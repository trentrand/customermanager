import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '@environments/environment';

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
  authorized: boolean;

  constructor(private titleService: Title) {
    this.getStartedRoute = '/dashboard'
    this.authorized = false
    this.title = this.titleService.getTitle()
    this.description = environment.description
  }

  ngOnInit() {
  }
}

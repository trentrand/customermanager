import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string
  portalIcon = 'fa fa-paw'
  currentRoute: any
  isNavbarCollapsed: boolean

  authenticated: boolean

  constructor(private titleService: Title, private route: ActivatedRoute) {
    this.title = this.titleService.getTitle()
    this.authenticated = true
  }

  ngOnInit(): void {

  }

  public getCurrentRoute = () => this.route.snapshot.url;

  public isActive = (item: any) => {
      this.currentRoute = this.getCurrentRoute();
      return this.currentRoute === item.route || this.currentRoute === item.route.slice(0, -1);
  }
}

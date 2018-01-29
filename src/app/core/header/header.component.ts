import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Title } from '@angular/platform-browser';
import { AuthService } from '@core/auth.service';

@Component({
  selector: 'core-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string
  portalIcon = 'fa fa-paw'
  currentRoute: any
  isCollapsed: boolean = true;

  constructor(private titleService: Title, private route: ActivatedRoute, public auth: AuthService) {
    this.title = this.titleService.getTitle()
  }

  ngOnInit(): void {

  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  public getCurrentRoute = () => this.route.snapshot.url;

  public isActive = (item: any) => {
    this.currentRoute = this.getCurrentRoute();
    return this.currentRoute === item.route || this.currentRoute === item.route.slice(0, -1);
  }

  public logout = () => {
    this.auth.signOut()
  }
}

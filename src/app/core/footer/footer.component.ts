import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'core-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  title: string;
  currentYear: number;

  constructor(private titleService: Title) {
    this.title = titleService.getTitle()
    this.currentYear = new Date().getFullYear()
  }

  ngOnInit() {
  }

}

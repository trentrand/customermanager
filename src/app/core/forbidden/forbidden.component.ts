import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // TODO: if you request access to something you don't have access to, unauthorize user
  }

}

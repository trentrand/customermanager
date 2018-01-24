import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs/Rx';

import { ClientsService } from '../clients.service';
import { ClientService } from '../client.service';
import { ClientData } from '../client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Data to be displayed as list items
  listItems: Observable<ClientData[]>

  constructor(private router: Router, private route: ActivatedRoute, private ref: ChangeDetectorRef, private clientService: ClientService) {
  }

  ngOnInit() {
    this.listItems = this.clientService.getSnapshot(undefined, true);
  }

  listItemClicked = (id: any) => {
    console.log(id)
    this.router.navigate(['/client', id])
  }

  togglePin = (event: any, client: ClientData) => {
    event.stopPropagation()
    this.clientService.getClient(client.id)
    client.pinned = !client.pinned
    return this.clientService.updateClient(client)
    .then((docRef ) => {
      console.log("Toggled Client Pin", docRef);
    })
  }
}

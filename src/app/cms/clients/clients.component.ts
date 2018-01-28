import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs/Rx';

import { ClientsService } from './clients.service';
import { ClientService } from './client.service';
import { ClientData } from './client';
import { IAlert } from '@core/ialert';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  queryParams: any

   // Data to be displayed as list items
   listItems: Observable<ClientData[]>

   // Order By Options (and default) for list items
   orderByOptions: string[] = ['last_name'];
   defaultOrderByProperty: string;

   // Filtering and ordering parameters
   searchFilter: string = '';
   orderByProperty: string = '';
   alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

   // Pagination parameters
   count: number;
   page: number;
   maxSize: number;
   params: any;

   alerts: Array<IAlert> = [];

   constructor(private router: Router, private route: ActivatedRoute, private ref: ChangeDetectorRef, private clientService: ClientService) {
   }

   ngOnInit() {
     // Apply query parameters
     this.route.params.subscribe((params: Params) => {
      this.params = params
      this.setSearchFilter(params['search'])
      this.setAlphaFilter(params['letter'])
      this.setOrderProperty(params['order'])
     })
     this.route.queryParams.subscribe((queryParams: Params) => {
      this.queryParams = queryParams;
     })

    this.listItems = this.clientService.getSnapshot(this.params.letter);
    // Alert that client was deleted successfully!
    if (this.queryParams['deletedClient']) {
      this.alerts.push({
        type: 'success',
        message: 'Client was successfully deleted',
      })
    }
   }
   createNewItem = () => {
     this.router.navigate(['/client/new'])
   }

   listItemClicked = (id: any) => {
     this.router.navigate(['/client', id])
   }

   getSearchPrompt = () => {
     if (this.params.search === this.searchFilter) {
       if (this.listItems.isEmpty) return `No search results for ${this.searchFilter}`
       else return `Search results for ${this.searchFilter}`
     } else return 'Hit enter or click on search button to perform search &nbsp;<i class="fa fa-search"></i>'
   }

   showSearchButton = () => {
     return !this.searchFilter || (this.params.search !== this.searchFilter)
   }

   updateParam = (param, value) => {
     var params = { ...this.params }
     if (value) params[param] = value
     else delete params[param]
     this.router.navigate(['./', params], { relativeTo: this.route })
   }

   setSearchFilter = (search: string) => {
     if (search !== undefined && search.length > 0) this.searchFilter = search;
     else this.searchFilter = '';
   }

   searchChanged = (event) => {
     if (this.searchFilter !== undefined && this.searchFilter.length == 0) {
       this.updateParam('search', '')
     }
   }

   setAlphaFilter = (letter: string) => {
     if (letter !== undefined && this.alphabet.indexOf(letter) > -1) {
       this.listItems = this.clientService.getSnapshot(this.params.letter);
       this.updateParam('letter', letter);
     } else this.updateParam('letter', 'A');
   }

   setOrderProperty = (orderByProperty: string) => {
     if (orderByProperty) {
       var validSortProperty = this.orderByOptions.filter((property) => {
         return property == orderByProperty
       }).length > 0
     }
     if (validSortProperty) this.orderByProperty = orderByProperty
     else this.orderByProperty = this.defaultOrderByProperty
   }

   pageChanged = () => {
     this.updateParam('page', this.page);
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

   closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}

import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, ReplaySubject, Subscription } from 'rxjs/Rx';

import { ClientsService } from './clients.service';
import { ClientService } from './client.service';
import { ClientData } from './client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
   // Data to be displayed as list items
   listItems: Observable<ClientData[]>

   // Order By Options (and default) for list items
   orderByOptions: string[] = ['last_name'];
   defaultOrderByProperty: string;

   // Filtering and ordering parameters
   searchFilter: string = '';
   orderByProperty: string = '';

   // Pagination parameters
   count: number;
   page: number;
   limit: number;
   maxSize: number;
   params: any;

   constructor(private router: Router, private route: ActivatedRoute, private ref: ChangeDetectorRef, private clientService: ClientService) {
   }

   ngOnInit() {
     // Apply query parameters
     this.route.params.subscribe((params: Params) => {
      this.params = params
      this.setSearchFilter(params['search'])
      this.setLimitFilter(params['limit']);
      this.setOrderProperty(params['order'])
     })

    this.listItems = this.clientService.getSnapshot();

    //  this.route.data.subscribe(snapshot => {
    //   if (snapshot['clients']) {
    //     this.listItems = snapshot['clients']
    //     this.count = this.listItems.length
    //     console.log(this.listItems)
    //     // this.config.page = snapshot['clients'].page
    //     // this.config.limit = snapshot['clients'].limit
    //   }
    // })
   }
   createNewItem = () => {
     this.router.navigate(['/client/new'])
   }

   listItemClicked = (id: any) => {
     console.log(id)
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

   setOrderProperty = (orderByProperty: string) => {
     if (orderByProperty) {
       var validSortProperty = this.orderByOptions.filter((property) => {
         return property == orderByProperty
       }).length > 0
     }
     if (validSortProperty) this.orderByProperty = orderByProperty
     else this.orderByProperty = this.defaultOrderByProperty
   }

   setLimitFilter = (limit: number) => {
     if (limit) this.limit = limit
     else this.limit = 10
   }

   pageChanged = () => {
     this.updateParam('page', this.page)
   }
}

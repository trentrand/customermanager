import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CmsRoutingModule, routedComponents } from './cms-routing.module';

import { ClientsService } from './clients/clients.service';
import { ClientService } from './clients/client.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    CmsRoutingModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [
    routedComponents,
  ],
  exports: [
    routedComponents
  ],
  providers: [
    ClientsService,
    ClientService
  ]
})
export class CmsModule {
  constructor() {
  }
}

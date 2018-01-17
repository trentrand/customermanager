import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreRoutingModule, routedComponents } from './core-routing.module';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgbModule,
    CoreRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  exports: [
    routedComponents
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule {
  constructor() {
  }
}

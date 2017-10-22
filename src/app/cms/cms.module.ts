import { NgModule, ModuleWithProviders, Inject, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CmsRoutingModule, routedComponents } from './cms-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    CmsRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  exports: [
    routedComponents
  ],
  providers: [
  ]
})
export class CmsModule {
  constructor() {
  }
}

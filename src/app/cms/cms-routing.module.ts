import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from '@cms/clients/clients.component';
import { ClientFormComponent } from '@cms/clients/client-form/client-form.component';
import { DashboardComponent } from '@cms/clients/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'clients',
    component: ClientsComponent
  },
  {
    path: 'client/new',
    component: ClientFormComponent,
    data: {
      editMode: false
    }
  },
  {
    path: 'client/:id',
    component: ClientFormComponent,
    data: {
      editMode: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }

export const routedComponents = [
  ClientsComponent,
  DashboardComponent,
  ClientFormComponent
];

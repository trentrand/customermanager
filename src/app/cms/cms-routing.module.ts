import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from '@cms/clients/clients.component';
import { ClientFormComponent } from '@cms/clients/client-form/client-form.component';
import { DashboardComponent } from '@cms/clients/dashboard/dashboard.component';

import { AuthGuard } from '@core/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'client/new',
    component: ClientFormComponent,
    data: {
      editMode: false
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'client/:id',
    component: ClientFormComponent,
    data: {
      editMode: true
    },
    canActivate: [AuthGuard]
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

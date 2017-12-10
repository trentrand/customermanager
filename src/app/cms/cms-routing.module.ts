import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './clients/clients.component';
import { ClientFormComponent } from '@cms/clients/client-form/client-form.component';

const routes: Routes = [
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

export const routedComponents = [ ClientsComponent, ClientFormComponent ];

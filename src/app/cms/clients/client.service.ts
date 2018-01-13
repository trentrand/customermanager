import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { ClientData } from '@cms/clients/client';

@Injectable()
export class ClientService {
  private basePath: string = '/clients';

  defaultClientsCollection: AngularFirestoreCollection<ClientData>;
  pinnedClientsCollection: AngularFirestoreCollection<ClientData>;

  clientsCollection: AngularFirestoreCollection<ClientData>;
  clientDocument: AngularFirestoreDocument<ClientData>;

  constructor(private afs: AngularFirestore) {
    this.defaultClientsCollection = this.afs.collection('clients', (ref) => ref.orderBy('last_name'));
    this.pinnedClientsCollection = this.afs.collection('clients', (ref) => ref.where('pinned', '==', true).orderBy('last_name'));

    this.clientsCollection = this.defaultClientsCollection
  }

  getData(): Observable<ClientData[]> {
    return this.clientsCollection.valueChanges();
  }

  getSnapshot(): Observable<ClientData[]> {
    this.clientsCollection = this.defaultClientsCollection
    return this.clientsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as ClientData;
        data['id'] = a.payload.doc.id
        return data
      })
    })
  }

  getPinnedSnapshot(): Observable<ClientData[]> {
    this.clientsCollection = this.pinnedClientsCollection
    return this.clientsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as ClientData;
        data['id'] = a.payload.doc.id
        return data
      })
    })
  }

  getClient(id: string) {
    this.clientDocument = this.afs.doc<ClientData>(`${this.basePath}/${id}`);
    return this.clientDocument.valueChanges()
  }

  create(data: ClientData) {
    return this.clientsCollection.add(data)
  }

  updateClient(data: ClientData) {
    return this.clientDocument.update(data)
  }

  deleteClient(data: ClientData) {
    return this.clientDocument.delete()
  }
}

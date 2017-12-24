import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { ClientData } from '@cms/clients/client';

@Injectable()
export class ClientService {
  private basePath: string = '/clients';

  clientsCollection: AngularFirestoreCollection<ClientData>;
  clientDocument: AngularFirestoreDocument<ClientData>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', (ref) => ref.orderBy('last_name', 'desc'));
  }

  getData(): Observable<ClientData[]> {
    return this.clientsCollection.valueChanges();
  }

  getSnapshot(): Observable<ClientData[]> {
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

  // deleteClient(id: string) {
  //   return this.getClient(id).delete();
  // }

}

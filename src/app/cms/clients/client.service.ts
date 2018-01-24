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
  }

  getData(): Observable<ClientData[]> {
    return this.clientsCollection.valueChanges();
  }

  getSnapshot(charFilter?: string, pinned?: boolean): Observable<ClientData[]> {
    return this.afs.collection('clients', ref => {
      let query: any = ref;
      if (charFilter) {
        charFilter = charFilter.toLowerCase();
        if (charFilter === 'z') {
          query = query.where('last_name_key', '>=', charFilter)
        } else if (charFilter !== 'z') {
          query = query.where('last_name_key', '>=', charFilter).where('last_name_key', '<', this.nextChar(charFilter))
        }
      } else if (pinned) {
        query = query.where('pinned', '==', true)
      }
      return query.orderBy('last_name_key');
    }).snapshotChanges().map((actions) => {
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

  nextChar(c: string) {
    return String.fromCharCode(c.toLowerCase() == 'z' ? 122 : c.charCodeAt(0) + 1).toLowerCase();
  }
}

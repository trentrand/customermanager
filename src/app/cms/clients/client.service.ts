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
    this.clientsCollection = this.afs.collection('clients', (ref) => ref.orderBy('last_name_key'));
  }

  getData(): Observable<ClientData[]> {
    return this.clientsCollection.valueChanges();
  }

  getSnapshot(filter?: string, pinned?: boolean): Observable<ClientData[]> {
    return this.afs.collection('clients', ref => {
      let query: any = ref;
      if (filter) {
        filter = filter.toLowerCase();
        if (filter.length > 1) {
          // Filter for search String
          return query.where('last_name_key', '==', filter)
        } else {
          // Filter alphabetically
          if (filter === 'z') {
            query = query.where('last_name_key', '>=', filter)
          } else if (filter !== 'z') {
            query = query.where('last_name_key', '>=', filter).where('last_name_key', '<', this.nextChar(filter))
          }
          return query.orderBy('last_name_key');
        }
      } else if (pinned) {
        return query.where('pinned', '==', true).orderBy('last_name_key');
      }
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
    data = this.updateKey(data);
    return this.clientsCollection.add(data)
  }

  updateClient(data: ClientData) {
    data = this.updateKey(data);
    return this.clientDocument.update(data)
  }

  deleteClient(data: ClientData) {
    return this.clientDocument.delete()
  }

  updateKey(data: ClientData) {
    data.last_name_key = data.last_name.toLowerCase();
    return data
  }

  nextChar(c: string) {
    return String.fromCharCode(c.toLowerCase() == 'z' ? 122 : c.charCodeAt(0) + 1).toLowerCase();
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { combineLatest } from 'rxjs/observable/combineLatest';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { ClientData } from '@cms/clients/client';
import { AuthService } from '@core/auth.service';

@Injectable()
export class ClientService {
  private basePath: string = '/clients';

  clientsCollection: AngularFirestoreCollection<ClientData>;
  clientDocument: AngularFirestoreDocument<ClientData>;

  constructor(private afs: AngularFirestore, private auth: AuthService) {
    this.clientsCollection = this.afs.collection('clients', (ref) => ref.orderBy('last_name_key'));
  }

  getData(): Observable<ClientData[]> {
    return this.clientsCollection.valueChanges();
  }

  getSnapshot(filter?: string, pinned?: boolean): Observable<ClientData[]> | Observable<ClientData> {
    // For dashboard, get client's list of pinned ids and retrieve records
    if (pinned) {
      console.log(this.auth.getPinnedIds())
      let pinnedDocuments = new Array<any>();
      for (let clientId of ['aPP2PZT4j0hi5mkzXkAr', '2346flkpCFckFhPgXUJP']) {
        let documentRef = this.afs.doc<ClientData>(`clients/${clientId}`).snapshotChanges()
            .map((action) => {
              const data = action.payload.data() as ClientData;
              data['id'] = action.payload.id
              return data
            })
        pinnedDocuments.push(documentRef)
      }
      return combineLatest(pinnedDocuments)
    } else {
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
        }
      }).snapshotChanges().map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as ClientData;
          data['id'] = a.payload.doc.id
          return data
        })
      })
    }
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

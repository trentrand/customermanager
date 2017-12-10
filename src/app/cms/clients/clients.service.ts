import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ClientData, ClientDataId } from '@cms/clients/client';

@Injectable()
export class ClientsService {
  private clientsCollection: AngularFirestoreCollection<any>;
  private clients: Observable<any[]>;
  private lastVisible: ClientData

  constructor(private afs: AngularFirestore) {
  }

  updateClients = (params: any): Observable<any> => {
    this.clientsCollection = this.afs.collection('clients', ref => {
      let query: any = ref
      if (params.orderBy) { query = query.orderBy('last_name') }
      if (this.lastVisible) { query = query.startAfter(this.lastVisible) }
      if (params.limit) { query = query.limit(params.limit)}
      return query
    })
    this.clients = this.clientsCollection.valueChanges()
    // this.clients = Observable.of(this.clientsCollection.snapshotChanges()
    //   .map(clients => {
    //     return clients.map(client => {
    //       console.log(client.payload.doc.id)
    //       const data = client.payload.doc.data()
    //       client.id = client.payload.doc.id
    //       return client
    //     })
    //   })
    // )
    this.clients.subscribe(snapshot => {
      this.lastVisible = snapshot[snapshot.length-1]
    })
    return this.clients
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

interface User {
  uid: string;
  email?: string | null;
}

@Injectable()
export class AuthService {
  user: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

    this.user = this.afAuth.authState
      .switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return Observable.of(null);
        }
      });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        return this.updateUserData(user);
      })
      .catch((error) => this.handleError(error) );
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.router.navigate(['/home']);
        return this.updateUserData(user);
      })
      .catch((error) => this.handleError(error) );
  }

  resetPassword(email: string) {
    const fbAuth = firebase.auth();

    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/logout']);
    });
  }

  private handleError(error: Error) {
    console.error(error);
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email || null
    };
    return userRef.set(data);
  }
}

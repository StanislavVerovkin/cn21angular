import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {User} from '../models/user.model';
import * as firebase from 'firebase';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase, private http: HttpClient, private afs: AngularFirestore
  ) {
  }

  addUserToDb(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      email: user.email
    });
  }

  addUserToDbWithParameters(user: User) {
    return this.db.list('userData').push(user);
  }

  getUserObject(uid: string): AngularFireObject<User> {
    return this.db.object('/users/' + uid);
  }
}

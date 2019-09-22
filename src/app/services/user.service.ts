import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { User } from '../models/user.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase
  ) {
  }

  addUserToDb(user: firebase.User, value) {
    this.db.object('/users/' + user.uid).update({
      email: value.email,
      address: value.address,
      name: value.name,
      mobile: value.mobile,
      city: value.city,
      postal_code: value.postal_code
    });
  }

  getUserObject(uid: string): AngularFireObject<User> {
    return this.db.object('/users/' + uid);
  }
}

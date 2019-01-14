import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private afs: AngularFirestore) {
  }

  create() {
    return this.afs.collection('cart').add({
      dateCreated: new Date().getDate()
    });
  }
}

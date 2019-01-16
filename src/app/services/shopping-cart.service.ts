import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  private create() {
    return this.afs.collection('cart').add({
      dateCreated: new Date().getDate()
    });
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      return cartId;
    } else {
      const result = await this.create();
      localStorage.setItem('cartId', result.id);
      return result.id;
    }
  }

  async addToCart(product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.afs.collection('cart').doc(cartId).collection('items').doc(product.id);

    item$.snapshotChanges()
      .pipe(
        take(1),
        map(a => {
          const exists = a.payload.exists;
          const data = a.payload.data();
          const id = a.payload.id;
          return {id, exists, ...data};
        })
      )
      .subscribe((item: any) => {
        if (item.exists) {
          item$.update({
            quantity: item.quantity + 1
          });
        } else {
          item$.set({
            product: product,
            quantity: 1
          });
        }
      });
  }
}


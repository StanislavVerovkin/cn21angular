import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../models/product.model';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  private create() {
    return this.db.list('cart').push({
      dateCreated: new Date().getDate()
    });
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      return cartId;
    } else {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }

  async addToCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/cart/' + cartId + '/items/');
  }
}

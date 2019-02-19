import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, take} from 'rxjs/operators';
import {ShoppingCart} from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {
  }

  private create() {
    return this.db.list('cart').push({
      dateCreated: new Date().toLocaleDateString()
    });
  }

  public async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/cart/' + cartId).valueChanges()
      .pipe(
        map((data: any) => {
          return new ShoppingCart(data.items);
        })
      );
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/cart/' + cartId + '/items').remove();
  }

  async clearItem(productId) {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/cart/' + cartId + '/items/' + productId).remove();
  }

  private getItem(cartId: string) {
    return this.db.object('/cart/' + cartId + '/items/');
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      return cartId;
    } else {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
  }

  async addToCart(product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product) {
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product, change: number) {

    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId);

    item$.valueChanges()
      .pipe(
        take(1)
      )
      .subscribe((item: any) => {

        debugger;

          if (item === null) {
            item$.set({
              product,
              quantity: 1
            });
          } else if (item !== null && item.product.size === product.size) {

            const quantity = (item.quantity || 0) + change;

            debugger

            this.db.object('/cart/' + cartId + '/items/').set({
              product,
              quantity
            });

            if (quantity === 0) {
              item$.remove();
            }
          } else if (item !== null && item.product.size !== product.size) {
            this.db.object('/cart/' + cartId + '/items/'  + `product-${product.size}`).update({
              product,
              quantity: 1
            });
          }
        }
      );
  }
}


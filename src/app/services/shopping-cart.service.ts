import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { ShoppingCart } from '../models/shopping-cart';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private afs: AngularFirestore,
    private db: AngularFireDatabase,
    private snackBar: MatSnackBar,
  ) {
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

  private getItem(cartId: string, productId: string) {
    return this.db.object('/cart/' + cartId + '/items/' + productId);
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
    const item$ = this.getItem(cartId, product.id);
    const limitOfAddedItems = 2;

    item$.valueChanges()
      .pipe(
        take(1)
      )
      .subscribe((item: any) => {

        if (item === null) {
          item$.set({
            product,
            quantity: 1
          });
        } else {

          if (product.id === item.product.id) {
            let quantity = (item.quantity || 0) + change;

            if (quantity > limitOfAddedItems) {
              quantity = limitOfAddedItems;
              this.snackBar.open('You can place a maximum of 2 identical items in the Shopping Bag', 'Close', {
                duration: 5000
              });
            }

            item$.update({
              product,
              quantity
            });

            if (quantity === 0) {
              item$.remove();
            }
          }
        }
      }
      );
  }
}


import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireDatabase} from '@angular/fire/database';
import {take} from 'rxjs/operators';

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

  public async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/cart/' + cartId).valueChanges();

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
      localStorage.setItem('cartId', result.id);
      return result.id;
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

    item$.valueChanges()
      .pipe(
        take(1)
      )
      .subscribe((item: any) => {
        console.log(item);
        if (item.quantity) {
          item$.update({
            quantity: item.quantity + change
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


import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from '../models/product.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase,
  ) {
  }

  addProductToDb(value) {
    return this.db.list('products').push({
      title: value.title,
      price: value.price,
      description: value.description,
      size: value.size,
      category: value.category,
      image: ''
    });
  }

  getAllProducts() {
    return this.db.list<Product>('products').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.val() as Product;
            const id = a.payload.key;
            return {id, ...data};
          });
        })
      );
  }

  getProductById(productId) {
    return this.db.object('/products/' + productId).valueChanges();
  }

  update(productId, image, value) {
    return this.db.object('/products/' + productId).update({
      title: value.title,
      price: value.price,
      description: value.description,
      size: value.size,
      category: value.category,
      image: image
    });
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}

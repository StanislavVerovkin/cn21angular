import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Product} from '../models/product.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase,
              private afs: AngularFirestore
  ) {
  }

  addProductToDb(product) {
    return this.afs.collection('products').add(product);
  }

  getAllProducts() {
    return this.afs.collection<Product>('products').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Product;
            const id = a.payload.doc.id;
            return {id, ...data};
          });
        })
      );
  }

  getProductById(productId) {
    return this.afs.collection('products').doc(productId);
  }

  update(productId, product) {
    return this.afs.collection('products').doc(productId).set(product);
  }

  delete(productId) {
    return this.afs.collection('products').doc(productId).delete();
  }
}

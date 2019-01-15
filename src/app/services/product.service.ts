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

  addProductToDb(value) {
    return this.afs.collection('products').add({
      title: value.title,
      price: value.price,
      description: value.description,
      size: value.size,
      category: value.category,
      image: ''
    });
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

  update(productId, image, value) {
    return this.afs.collection('products').doc(productId).set({
      title: value.title,
      price: value.price,
      description: value.description,
      size: value.size,
      category: value.category,
      image: image
    });
  }

  delete(productId) {
    return this.afs.collection('products').doc(productId).delete();
  }
}

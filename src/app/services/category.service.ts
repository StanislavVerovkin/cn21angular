import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../models/product.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase,
              private afs: AngularFirestore
  ) {
  }

  getCategories() {
    return this.afs.collection('categories').snapshotChanges()
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
}

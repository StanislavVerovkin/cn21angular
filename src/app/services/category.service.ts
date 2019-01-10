import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase,
              private afs: AngularFirestore
  ) {
  }

  getCategories() {
    return this.afs.collection('categories');
  }
}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase,
  ) {
  }

  getCategories() {
    return this.db.list('categories').snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.val();
            const id = a.payload.key;
            return { id, ...data };
          });
        })
      );
  }
}

import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
  }

  storeOrder(order) {
    return this.db.list('/orders').push(order);
  }

  getAllOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getWarehouses() {
    return this.http.post('https://api.novaposhta.ua/v2.0/json/ ', {
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      apiKey: '9e3e3e31d4ab0b594528f53be9a9f255',
    });
  }
}

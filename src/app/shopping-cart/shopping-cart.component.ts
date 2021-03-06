import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public cart$: Observable<ShoppingCart>;

  constructor(private cartService: ShoppingCartService) {
  }

  async ngOnInit() {
    (this.cart$ = await this.cartService.getCart());
  }

  clearCart() {
    this.cartService.clearCart();
  }

  clearItem(productId) {
    this.cartService.clearItem(productId);
  }

  trackByFn(index, item) {
    return item.product.id;
  }
}

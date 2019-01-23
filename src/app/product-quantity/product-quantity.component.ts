import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/product.model';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
  @Input('shoppingCart') shoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}

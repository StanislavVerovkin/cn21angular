import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../models/product.model';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shoppingCart') shoppingCart;

  constructor(private cartService: ShoppingCartService,
  ) {
  }

  ngOnInit() {
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product) {
    this.cartService.removeFromCart(product);
  }

  getQuantity(product) {
    if (!this.shoppingCart) {
      return 0;
    }
    const item = this.shoppingCart.itemsMap[product.id];
    return item.quantity ? item.quantity : 0;
  }
}

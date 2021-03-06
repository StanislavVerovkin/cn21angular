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

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  public id;
  public isLoaded = false;
  public product: any = {};
  public cart$;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService
  ) {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProductById(this.id)
        .subscribe((data) => {
          this.product = data;
          this.isLoaded = true;
        });
    }
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}

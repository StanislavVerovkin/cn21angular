import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';
import {switchMap} from 'rxjs/operators';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public categories$;
  public category: string;
  public cart;
  public cart$: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: ShoppingCartService,
    public route: ActivatedRoute,
  ) {

    this.productService.getAllProducts()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter((p) => p.category === this.category) :
          this.products;
      });

    this.categories$ = this.categoryService.getCategories();
    this.category = this.route.snapshot.paramMap.get('category');
  }

  async ngOnInit() {
    (this.cart$ = await this.cartService.getCart())
      .subscribe((data) => {
        this.cart = data;
      });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product) {
    this.cartService.removeFromCart(product);
  }

  getQuantity(product) {
    if (!this.cart) {
      return 0;
    }
    const item = this.cart.itemsMap[product.id];
    return item.quantity ? item.quantity : 0;
  }
}

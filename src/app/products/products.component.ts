import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';
import {first, map, switchMap, take} from 'rxjs/operators';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {Subscription} from 'rxjs';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
    (await this.cartService.getCart())
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            return {...data};
          });
        })
      )
      .subscribe((cart) => {
        this.cart = cart;
      });
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  getQuantity() {

    if (!this.cart) {
      return 0;
    }

    const item = this.cart;
    console.log(item);

    return item.quantity ? item.quantity : 0;
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';
import {switchMap} from 'rxjs/operators';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  public filteredProducts: Product[] = [];
  public categories$;
  public category: string;
  public cart: any;
  public subscription;
  public shoppingCartItemCount: number;

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
    this.subscription = (await this.cartService.getCart())
      .subscribe((cart) => {
        this.cart = cart.items;
        console.log(this.cart);

        this.shoppingCartItemCount = 0;
        for (const productId in cart.items) {
          this.shoppingCartItemCount += this.cart[productId].quantity;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    const item = this.cart[product.id];
    return item.quantity ? item.quantity : 0;
  }
}

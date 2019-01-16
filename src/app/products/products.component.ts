import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product.model';
import {map, switchMap} from 'rxjs/operators';
import {CategoryService} from '../services/category.service';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {ShoppingCartService} from '../services/shopping-cart.service';

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

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private shoppingCart: ShoppingCartService,
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

  ngOnInit() {
  }

  addToCart(product = this.products) {
    this.shoppingCart.addToCart(product);
  }
}

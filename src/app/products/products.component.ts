import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products$;

  constructor(
    private productService: ProductService
  ) {

    this.productService.getAllProducts().valueChanges()
      .subscribe((data) => {
        this.products$ = data;
      });
  }

  ngOnInit() {
  }
}

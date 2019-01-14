import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  public id;
  public isLoaded = false;
  public product: any = {};

  constructor(private route: ActivatedRoute,
              private productService: ProductService
  ) {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProductById(this.id).valueChanges()
        .subscribe((data) => {
          this.product = data;
          this.isLoaded = true;
        });
    }
  }

  ngOnInit() {
  }
}

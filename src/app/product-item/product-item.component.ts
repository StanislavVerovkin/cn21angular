import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  public id;
  public product: any = {};

  constructor(private route: ActivatedRoute, private productService: ProductService,
  ) {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProductById(this.id).valueChanges()
        .pipe(
          take(1)
        )
        .subscribe((data) => {
          this.product = data;
        });
    }
  }

  ngOnInit() {
  }
}

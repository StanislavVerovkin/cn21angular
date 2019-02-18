import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialogs/dialog/dialog.component';
import {FormControl} from '@angular/forms';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  public id;
  public product: any = {};
  public cart$;

  public index;
  public images = [];
  public size = new FormControl();

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: ShoppingCartService,
              public dialog: MatDialog
  ) {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProductById(this.id)
        .subscribe((data) => {
          this.product = data;
          this.images.push(this.product.image, this.product.secondImage, this.product.thirdImage);
        });
    }
  }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  onChange(idx) {
    console.log(idx);
    this.index = idx;
  }

  addToCart() {

    const product = {
      // id: this.product.id,
      size: this.size.value,
      category: this.product.category,
      description: this.product.description,
      image: this.product.image,
      price: this.product.price,
      title: this.product.title
    };

    this.product.preOrder ?
      this.dialog.open(DialogComponent, {
        height: '400px',
        width: '600px',
        data: product
      })
      :
      this.cartService.addToCart(product);
  }
}

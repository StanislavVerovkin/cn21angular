import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {CarouselComponent} from 'angular2-carousel';

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
              private cartService: ShoppingCartService,
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

  @ViewChild('topCarousel') topCarousel: CarouselComponent;

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  prev(){
    this.topCarousel.slidePrev();
  }
  next(){
    this.topCarousel.slideNext();
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}

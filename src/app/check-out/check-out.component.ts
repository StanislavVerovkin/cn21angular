import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Subscription} from 'rxjs';
import {OrderService} from '../services/order.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public userData;
  public cart: ShoppingCart;
  public subscription: Subscription;

  constructor(private auth: AuthService,
              private cartService: ShoppingCartService,
              private orderService: OrderService,
              private spinner: NgxSpinnerService,
  ) {
  }

  async ngOnInit() {

    this.form = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
      ]),
      'address': new FormControl('', [
        Validators.required,
      ]),
      'mobile': new FormControl('', [
        Validators.required,
      ]),
      'city': new FormControl('', [
        Validators.required,
      ]),
      'postal_code': new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });


    const cart$ = await this.cartService.getCart();
    this.subscription = cart$.subscribe((cart) => {
      this.cart = cart;
    });

    return this.auth.appUser$
      .subscribe(data => {
        this.userData = data;
        this.form.get('address').setValue(this.userData.address);
        this.form.get('name').setValue(this.userData.name);
        this.form.get('mobile').setValue(this.userData.mobile);
        this.form.get('city').setValue(this.userData.city);
        this.form.get('postal_code').setValue(this.userData.postal_code);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  placeOrder() {
    const order = {
      dateCreated: new Date().getDate(),
      shipping: this.form.value,
      items: this.cart.items.map(i => {
        return {
          product: {
            title: i.product.title,
            image: i.product.image,
            price: i.product.price
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        };
      })
    };
    this.spinner.show();
    this.orderService.storeOrder(order)
      .then(() => {
        this.spinner.hide();
      });
  }
}

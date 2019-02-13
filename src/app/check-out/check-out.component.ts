import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {ShoppingCart} from '../models/shopping-cart';
import {Observable, Subscription} from 'rxjs';
import {OrderService} from '../services/order.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public userData;
  public userId;
  public delivery = [];
  public cart: ShoppingCart;
  public cartSubscription: Subscription;
  public userSubscription: Subscription;
  public filteredWarehouses: Observable<string[]>;

  constructor(
    private auth: AuthService,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private spinner: NgxSpinnerService,
    private router: Router
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
      ]),
      'delivery': new FormControl('', [
        Validators.required,
      ]),
    });

    this.filteredWarehouses = this.form.controls.delivery.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    const cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => {
      this.cart = cart;
    });

    this.userSubscription = this.auth.user$.subscribe((user) => {
      this.userId = user.uid;
    });

    this.orderService.getWarehouses()
      .subscribe((data: any) => {
        this.delivery = data.data;
      });

    this.auth.appUser$
      .subscribe(data => {
        if (data !== null) {
          this.userData = data;
          this.form.get('address').setValue(this.userData.address);
          this.form.get('name').setValue(this.userData.name);
          this.form.get('mobile').setValue(this.userData.mobile);
          this.form.get('city').setValue(this.userData.city);
          this.form.get('postal_code').setValue(this.userData.postal_code);
        }
      });
  }

  async placeOrder() {
    const order = {
      userId: this.userId,
      dateCreated: new Date().toLocaleDateString(),
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

    const result = await this.orderService.storeOrder(order);
    this.cartService.clearCart();
    this.router.navigate(['/order-success', result.key]);

    this.spinner.hide();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.delivery.filter(data => data.DescriptionRu.toLowerCase().includes(filterValue));
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}

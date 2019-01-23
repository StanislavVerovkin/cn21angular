import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user.model';
import {ShoppingCart} from '../models/shopping-cart';
import {Observable} from 'rxjs';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public appUser: User;
  public cart;
  public cart$: Observable<ShoppingCart>;

  constructor(private fb: AngularFireAuth,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private router: Router,
              private cartService: ShoppingCartService,
  ) {
  }

  async ngOnInit() {
    this.spinner.show();
    this.authService.appUser$
      .subscribe((appUser) => {
        this.appUser = appUser;
        this.spinner.hide();
      });

    (this.cart$ = await this.cartService.getCart())
      .subscribe((data) => {
        this.cart = data;
      });
  }

  onLogout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.snackBar.open(error.message, 'Close');
      });
  }
}

import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user.model';
import {ShoppingCart} from '../models/shopping-cart';
import {Observable} from 'rxjs';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {CategoryService} from '../services/category.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public appUser: User;
  public cart;
  public categories$;
  public category: string;
  public cart$: Observable<ShoppingCart>;
  public mobileQuery: MediaQueryList;
  public _mobileQueryListener: () => void;

  constructor(private fb: AngularFireAuth,
              private authService: AuthService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private router: Router,
              private cartService: ShoppingCartService,
              private categoryService: CategoryService,
              private translate: TranslateService,
              public route: ActivatedRoute,
              public changeDetectorRef: ChangeDetectorRef,
              public media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.categories$ = this.categoryService.getCategories();
    this.category = this.route.snapshot.paramMap.get('category');
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

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

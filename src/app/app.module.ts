import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatExpansionModule,
  MatDialogModule,
  MatGridListModule,
  MatProgressBarModule,
  MatBadgeModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatCheckboxModule,
  MatChipsModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';
import {LoginComponent} from './auth/login/login.component';
import {RegistrationComponent} from './auth/registration/registration.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {NgxSpinnerModule} from 'ngx-spinner';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {OrdersComponent} from './admin/orders/orders.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {ProductsComponent} from './products/products.component';
import {AuthGuard} from './services/auth.guard';
import {UserService} from './services/user.service';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AdminGuard} from './services/admin.guard';
import {ProductFormComponent} from './admin/product-form/product-form.component';
import {CategoryService} from './services/category.service';
import {ProductService} from './services/product.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {ProductItemComponent} from './product-item/product-item.component';
import {ShoppingCartService} from './services/shopping-cart.service';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductQuantityComponent} from './product-quantity/product-quantity.component';
import {OrderService} from './services/order.service';
import {FlexLayoutModule} from '@angular/flex-layout';


const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product-item/:id', component: ProductItemComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},

  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/orders', component: OrdersComponent, canActivate: [AuthGuard, AdminGuard]}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ProductsComponent,
    OrdersComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    ProductFormComponent,
    HeaderComponent,
    HomeComponent,
    ProductItemComponent,
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  imports: [
    [RouterModule.forRoot(routes, {useHash: true})],
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    NgxDatatableModule,
    MatTableModule,
    MatExpansionModule,
    MatDialogModule,
    NgxDatatableModule,
    MatGridListModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule
  ],
  providers: [
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

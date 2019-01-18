import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public isLinear = false;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public cart$;

  constructor(private _formBuilder: FormBuilder, private shoppingCartService: ShoppingCartService) {
  }

 async ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.cart$ = await this.shoppingCartService.getCart();
  }
}

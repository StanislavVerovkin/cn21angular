import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    private cartService: ShoppingCartService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    this.cartService.addToCart(this.data)
      .then(() => {
        this.dialogRef.close();
      });
  }
}

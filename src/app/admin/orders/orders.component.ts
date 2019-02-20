import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {MatBottomSheet} from '@angular/material';
import {BottomSheetComponent} from './bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders$;

  constructor(private orderService: OrderService,
              private bottomSheet: MatBottomSheet
  ) {
    this.orders$ = this.orderService.getAllOrders();
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: this.orders$
    });
  }

  ngOnInit() {
  }
}

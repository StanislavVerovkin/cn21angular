import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders$;

  constructor(private orderService: OrderService
  ) {
    this.orders$ = this.orderService.getAllOrders();
  }

  ngOnInit() {
  }
}

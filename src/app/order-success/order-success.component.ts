import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  public id;
  public order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.orderService.getOrderById(this.id)
        .subscribe((data: any[]) => {
          this.order = data.forEach((i) => {
            debugger
            console.log(i.totalPrice);
          });
        });
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {OrderService} from '../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {

  public id;
  public order = [];
  public total;
  public formFromServer;
  public isLoaded = false;

  constructor(private orderService: OrderService,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.spinner.show();
      this.orderService.getOrderById(this.id)
        .subscribe((data: any[]) => {
          data.forEach((i) => {
            this.order.push(i.totalPrice);
            this.total = this.order.reduce((sum, current) => {
              return sum + current;
            }, 0);
          });
          this.orderService.pay(this.total)
            .subscribe((form) => {
              this.formFromServer = form;
              this.isLoaded = true;
              this.spinner.hide();
            });
        });
    }
  }
}

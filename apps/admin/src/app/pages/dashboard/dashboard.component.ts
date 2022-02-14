import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@bluebits/orders';
import { ProductsService } from '@bluebits/products';
import { UsersService } from '@bluebits/users';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  endSubs$ : Subject<any> = new Subject();
  statistics :any= []
  productCount = 0;
  userCount = 0;
  orderCount = 0;
  totalsales = 0;
  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private orderService: OrdersService
    ) { }

  ngOnInit(): void {
    combineLatest([
      this.productsService.getProductsCount().pipe(takeUntil(this.endSubs$)),
      this.usersService.getUsersCount().pipe(takeUntil(this.endSubs$)),
      this.orderService.getOrdersCount().pipe(takeUntil(this.endSubs$)),
      this.orderService.getTotalSales().pipe(takeUntil(this.endSubs$))
    ]).subscribe((values) => {
      this.statistics = values
    })
  }

  ngOnDestroy(): void {
      this.endSubs$.next();
      this.endSubs$.complete
  }

  

}

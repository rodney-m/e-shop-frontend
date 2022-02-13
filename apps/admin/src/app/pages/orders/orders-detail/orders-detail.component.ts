import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
})
export class OrdersDetailComponent implements OnInit {
  order! : Order;
  selectedStatus! : any;
  orderStatuses = [
    {
      name: 'Pending',
      id: 'primary'
    },
   {
      name: 'Processed',
      id: 'warning'
    },
   {
      name: 'Shipped',
      id: 'warning'
    },
    {
      name: 'Delivered',
      id: 'success'
    },
   {
      name: 'Failed',
      id: 'danger'
    }
  ]
  constructor(
    private orderService : OrdersService,
    private activatedRoute : ActivatedRoute,
    private messageService : MessageService) { }

  ngOnInit(): void {
    this._getOrder()
  }

  private _getOrder(){
    this.activatedRoute.params.subscribe(params => {
      if(params.id){
        this.orderService.getOrder(params.id).subscribe(order => {
          this.order = order
          this.selectedStatus= order.status
        })
      }
    })
    this.orderService.getOrder
  }

  onStatusChange(event: any){
    this.orderService.updateOrder({status : event.value}, this.order.id!)
      .subscribe((order) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order status has been updated'
        })
      }, (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated'
        })
      } )
  }

  

}

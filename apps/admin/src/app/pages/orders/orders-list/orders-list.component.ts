/* eslint-disable @typescript-eslint/ban-types */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@bluebits/orders';
import { ConfirmationService, MessageService } from 'primeng/api';


const ORDER_STATUS = {
  0: {
    label: 'Pending',
    color: 'primary'
  },
  1: {
    label: 'Processed',
    color: 'warning'
  },
  2: {
    label: 'Shipped',
    color: 'warning'
  },
  3: {
    label: 'Delivered',
    color: 'success'
  },
  4: {
    label: 'Failed',
    color: 'danger'
  }
}


@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit {
  orders: Order[]=[]
  orderStatus= [
    {
      label: 'Pending',
      color: 'primary'
    },
   {
      label: 'Processed',
      color: 'warning'
    },
   {
      label: 'Shipped',
      color: 'warning'
    },
    {
      label: 'Delivered',
      color: 'success'
    },
   {
      label: 'Failed',
      color: 'danger'
    }
  ]
  
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private messageService : MessageService,
    private confirmationService : ConfirmationService
    ) { }

  ngOnInit(): void {
    this._getOrders()
  }

  deleteOrder(orderId:string){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this Order?',
        header: 'Delete Order',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.ordersService.deleteOrder(orderId).subscribe((order : Order) => {
            this._getOrders()
            this.messageService.add({severity:'success', summary:'Success', detail:`Order was succesfully deleted`});
          }, 
          () => {
            this.messageService.add({severity:'error', summary:'Error', detail:'Order is not deleted'});
          }) 
        },
      })
  
  }

  showOrder(orderId:string){
    this.router.navigateByUrl(`orders/${orderId}`)
  }

  private _getOrders(){
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders=orders
    })
  }
}
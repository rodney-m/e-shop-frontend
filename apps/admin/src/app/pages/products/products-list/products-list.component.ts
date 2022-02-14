import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '@bluebits/products';
import { Product } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  endSubs$ : Subject<any> = new Subject()
  products! : Product[];
  constructor(
    private productsService: ProductsService,
    private router : Router,
    private messageService: MessageService,
    private confirmationService : ConfirmationService,
    ) { }

  ngOnInit(): void {
    this._getProducts()
  }

  ngOnDestroy(){
    this.endSubs$.next()
    this.endSubs$.complete()
  }

  deleteProduct(productId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).pipe(takeUntil(this.endSubs$)).subscribe((product : Product) => {
          this._getProducts()
          this.messageService.add({severity:'success', summary:'Success', detail:`Product ${product.name} deleted`});
        }, 
        () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Product is not deleted'});
        }) 
      },
    })
  }

  updateProduct(productId: string){
    this.router.navigateByUrl(`products/form/${productId}`)
  }

  private _getProducts(){
    this.productsService.getProducts().pipe(takeUntil(this.endSubs$)).subscribe((product) => {
      this.products = product;
    })
  }

}

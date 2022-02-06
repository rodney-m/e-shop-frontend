import { Component, OnInit } from '@angular/core';
import { ProductsService } from '@bluebits/products';
import { Product } from '@bluebits/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  products! : Product[];
  constructor(
    private productsService: ProductsService
    ) { }

  ngOnInit(): void {
    this._getProducts()
  }

  deleteProduct(productId: string){
    
  }

  updateProduct(productId: string){

  }

  private _getProducts(){
    this.productsService.getProducts().subscribe((product) => {
      this.products = product;
    })
  }

}

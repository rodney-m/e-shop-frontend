import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '@bluebits/products';
import { Category } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})

export class CategoriesListComponent implements OnInit {
  category : Category[] = []
  constructor(private categoriesService: CategoriesService, 
    private messageService: MessageService,
    private confirmationService : ConfirmationService,
    private router : Router) { }

  ngOnInit(): void {
    this._getCategories()
  }

  deleteCategory(categoryId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe((category : Category) => {
          this._getCategories()
          this.messageService.add({severity:'success', summary:'Success', detail:`Category ${category.name} deleted`});
        }, 
        () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Category is not deleted'});
        }) 
      },
  });    
     
  }

  updateCategory(categoryId : string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(res => {
      this.category = res
    })
  }

}
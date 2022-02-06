/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {
  form! : FormGroup;
  isSubmitted : boolean = false;
  editmode : boolean = false;
  currentCategoryId! : string;

  constructor(
    private formBuilder: FormBuilder, 
    private categoryService : CategoriesService, 
    private messageService: MessageService,
    private location : Location,
    private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      icon : ['', Validators.required],
      color: ['#ffffff']
    })

    this._checkEditMode();
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }

    const category : Category = {
      id : this.currentCategoryId,
      name : this.categoryForm.name.value,
      icon : this.categoryForm.icon.value,
      color : this.categoryForm.color.value,
    }

    if (this.editmode){
      this._updateCategory(category)
    } else {
      this._addCategory(category)
    }

    
  }

  private _addCategory(category : Category){
    this.categoryService.createCategory(category).subscribe((res)=> {
      this.messageService.add({severity:'success', summary:'Success', detail:'Category is created'});
      timer(2000).toPromise().then(done => {
        this.location.back();
      })
    }, 
    (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not created'});
    })
  }

  private _updateCategory(category : Category){
    this.categoryService.updateCategory(category).subscribe((res)=> {
      this.messageService.add({severity:'success', summary:'Success', detail:'Category is updated'});
      timer(2000).toPromise().then(done => {
        this.location.back();
      })
    }, 
    (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not updated'});
    })
  }

  get categoryForm(){
    return this.form.controls
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params => {
      if (params.id){
        this.editmode = true;
        this.currentCategoryId = params.id
        this.categoryService.getCategory(params.id).subscribe(category => {
          this.categoryForm.name.setValue(category.name)
          this.categoryForm.icon.setValue(category.icon)
          this.categoryForm.color.setValue(category.color)
        })
      }
    })
  }
}
 
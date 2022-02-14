import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  endSubs$ : Subject<any> = new Subject(); 
  editmode  = false;
  form!: FormGroup;
  isSubmitted = false;
  categories : Category[]=[]
  imageDisplay! : string | ArrayBuffer | any;
  currentProductId!: string;


  constructor(
    private formBuilder : FormBuilder,
    private categoriesService : CategoriesService,
    private productsService: ProductsService,
    private messageService : MessageService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode()
  }

  ngOnDestroy(): void {
      this.endSubs$.next();
      this.endSubs$.complete();
  }

  private _initForm(){
    this.form = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            isFeatured: [false]
    })
  }

  get productForm(){
    return this.form.controls;
  }

  private _getCategories (){
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories => {
      this.categories = categories;
    })
  }

  onSubmit(){
    this.isSubmitted =true;
    if(this.form.invalid) return ;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);    
    })

    if (this.editmode){
    this._updateProduct(productFormData)
    } else {
    this._addProduct(productFormData);
    }
  }

  onCancel(){
    this.location.back();
  }

  private _addProduct(productData : FormData){
    this.productsService.createProduct(productData).pipe(takeUntil(this.endSubs$)).subscribe(
      (product : Product)=> {
      this.messageService.add(
        {
          severity:'success', 
          summary:'Success', 
          detail:`Product ${product.name} is created`
        });
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, 
    () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not created'});
    })
  }

  private _updateProduct(productFormData : FormData){
    this.productsService.updateProduct(productFormData, this.currentProductId).pipe(takeUntil(this.endSubs$)).subscribe(
      (product : Product)=> {
      this.messageService.add({severity:'success', summary:'Success', detail:`Product ${product.name} updated`});
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, 
    () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Product is not updated'});
    })
  }


  onImageUpload(event: any){
    const file = event.target.files[0];

    if(file){
      this.form.patchValue({image: file});
      this.form.get('image')?.updateValueAndValidity();
      const fileReader : any= new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file);
    }
  }

  _checkEditMode(){
    this.activatedRoute.params.subscribe((params) => {
      if (params.id){
        this.editmode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).pipe(takeUntil(this.endSubs$)).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay =  product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        })
      }
    })
  }



}

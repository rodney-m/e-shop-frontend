import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {
  editmode  = false;
  form!: FormGroup;
  isSubmitted = false;
  categories : Category[]=[]
  imageDisplay! : string | ArrayBuffer;

  constructor(
    private formBuilder : FormBuilder,
    private categoriesService : CategoriesService
    ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
  }

  private _initForm(){
    this.form = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['',],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            isFeatured: ['']
    })
  }

  get productForm(){
    return this.form.controls;
  }

  private _getCategories (){
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  onSubmit(){

  }

  onCancel(){

  }

  onImageUpload(event: any){
    const file = event.target.files[0];

    if(file){
      const fileReader : any= new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file);
    }
  }



}

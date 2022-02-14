import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import * as countriesLib  from"i18n-iso-countries";
import { takeUntil } from 'rxjs/operators';

declare const require : any;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit, OnDestroy {
  endSubs$ : Subject<any> = new Subject()
  form! : FormGroup;
  isSubmitted  = false;
  editmode = false;
  currentUserId! : string;
  countries : any = []
  name! :string;

  constructor(
    private formBuilder: FormBuilder, 
    private usersService : UsersService, 
    private messageService: MessageService,
    private location : Location,
    private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit(): void {    
    this._innitUserForm();
    this._checkEditMode();
    this._getCountries();
  }

  ngOnDestroy(): void {
      this.endSubs$.next();
      this.endSubs$.complete();
  }

  private _innitUserForm(){
    this.form = this.formBuilder.group({
      name : ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      phone: ["", Validators.required],
      token: [""],
      isAdmin: [false],
      street: [""],
      apartment: [""],
      zip: [""],
      city: [""],
      country: [""]
    })
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }

    const user : User = {
      id : this.currentUserId,
      name : this.userForm.name.value,
    }

    if (this.editmode){
      this._updateUser(user)
    } else {
      this._adduser(user)
    }

    
  }

  private _adduser(user : User){
    this.usersService.createUser(user).pipe(takeUntil(this.endSubs$)).subscribe((user : User)=> {
      this.messageService.add({severity:'success', summary:'Success', detail:`user ${user.name} is created`});
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, 
    () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'user is not created'});
    })
  }

  private _updateUser(user : User){
    this.usersService.updateUser(user, this.currentUserId).pipe(takeUntil(this.endSubs$)).subscribe((user : User)=> {
      this.messageService.add({severity:'success', summary:'Success', detail:`user ${user.name} updated`});
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, 
    () => {
      this.messageService.add({severity:'error', summary:'Error', detail:'user is not updated'});
    })
  }

  private _getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesLib.getNames("en", {select : "official"})).sort().map((entry) => {
          return {
            id: entry[0],
            name: entry[1]
          }
    })
  }

  onCancel(){
    this.location.back();
  }

  get userForm(){
    return this.form.controls
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params => {
      if (params.id){
        this.editmode = true;
        this.currentUserId = params.id
        this.usersService.getUser(params.id).pipe(takeUntil(this.endSubs$)).subscribe(user => {
          this.userForm.name.setValue(user.name)
          this.userForm.email.setValue(user.email)
          this.userForm.isAdmin.setValue(user.isAdmin)
          this.userForm.street.setValue(user.street)
          this.userForm.apartment.setValue(user.apartment)
          this.userForm.zip.setValue(user.zip)
          this.userForm.city.setValue(user.city)
          this.userForm.country.setValue(user.country)
          this.userForm.password.setValidators([]);
          this.userForm.password.updateValueAndValidity();
        })
      }
    })
  }

}

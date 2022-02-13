import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._initloginForm()
  }

  private _initloginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls
  }

  onSubmit(){
    this.isSubmitted =true;
  }

}

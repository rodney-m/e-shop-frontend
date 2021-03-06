import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@bluebits/users';
import { LocalStorageService } from '@bluebits/users';


@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';
  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    private localStorageService: LocalStorageService,
    private router : Router
    ) { }

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
    if (this.loginFormGroup.invalid) return;
    this.authservice.login(this.loginForm.email.value, this.loginForm.password.value)
      .subscribe(user => {
        this.localStorageService.setToken(user.token)
        this.authError =false
        this.router.navigate(['/']);
      }, (error : HttpErrorResponse) => {
        this.authError =true;
        if(error.status !== 400){
          this.authMessage= 'Error in the server, please try again later!'
        }
      })

  }

}

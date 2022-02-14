import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@bluebits/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as countriesLib  from"i18n-iso-countries";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit , OnDestroy{
  endSubs$ : Subject<any> = new Subject();
 users: User[] =[]
 countries : any = []

  constructor(private messageService: MessageService,
    private confirmationService : ConfirmationService,
    private router : Router,
    private usersService: UsersService,) {
    
  }

  ngOnInit(): void {
    this._getUsers()
  }

  ngOnDestroy(): void {
      this.endSubs$.next()
      this.endSubs$.complete()
  }

  private _getUsers(){
    this.usersService.getUsers().pipe(takeUntil(this.endSubs$)).subscribe((user) => {
      this.users =user
    })
  }

  deleteUser(userId: string){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).pipe(takeUntil(this.endSubs$)).subscribe((user : User) => {
          this._getUsers()
          this.messageService.add({severity:'success', summary:'Success', detail:`Category ${user.name} deleted`});
        }, 
        () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'User is not deleted'});
        }) 
      },
  });    
     
  }

  updateUser(userId : string) {
    this.router.navigateByUrl(`users/form/${userId}`)
  }  

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

}


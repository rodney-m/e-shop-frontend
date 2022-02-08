import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';

import { CategoriesService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';


import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { TagModule } from 'primeng/tag';

import { AppRoutingModule } from './app.routing.module';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputNumberModule,
  InputTextareaModule,
  InputSwitchModule,
  DropdownModule,
  EditorModule,
  TagModule
]


@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UsersFormComponent, UsersListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CardModule,
    ...UX_MODULE,
  ],
  providers: [CategoriesService, MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}

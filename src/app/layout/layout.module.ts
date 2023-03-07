import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbButtonsModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import { UsersComponent } from './components/users/users.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { ngfModule } from "angular-file";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


@NgModule({
  declarations: [
    UsersComponent,
    DashboardComponent,
    UserProfileComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    NgSelectModule,
    NgbPaginationModule,
    BsDatepickerModule,
    ReactiveFormsModule,
    NgbButtonsModule,
    ngfModule
  ]
})
export class LayoutModule { }

import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgSelectModule} from "@ng-select/ng-select";
import { LayoutComponent } from './layout/layout.component';
import { SignupComponent } from './auth/signup/signup.component';
import {ToastrModule} from 'ngx-toastr';
import {DatepickerModule, BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptor} from "@app/interceptors/jwt.interceptor";
import {DatePipe, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {LayoutModule} from "@app/layout/layout.module";
import { SpinnerComponent } from './spinner/spinner.component';
import {SpinnerService} from "@app/spinner/spinner.service";
import {SpinnerInterceptor} from "@app/interceptors/spinner.interceptor";
import { ngfModule } from "angular-file";
import { HomeComponent } from './home/home.component';
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SignupComponent,
    SpinnerComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    BsDatepickerModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    LayoutModule,
    ngfModule,
    NgbDatepickerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }

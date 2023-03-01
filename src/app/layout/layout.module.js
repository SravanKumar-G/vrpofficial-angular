import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbButtonsModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { OrderJsonComponent } from './components/order-json/order-json.component';
import { UsersComponent } from './components/users/users.component';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { OrderReportsComponent } from './components/order-reports/order-reports.component';
import { ngfModule } from "angular-file";
let LayoutModule = class LayoutModule {
};
LayoutModule = __decorate([
    NgModule({
        declarations: [
            OrdersComponent,
            OrderJsonComponent,
            UsersComponent,
            OrderReportsComponent
        ],
        exports: [
            OrdersComponent
        ],
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
], LayoutModule);
export { LayoutModule };
//# sourceMappingURL=layout.module.js.map
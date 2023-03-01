import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from "@app/layout/layout.component";
import { AuthGuard } from "@app/guards/auth.guard";
import { OrderReportsComponent } from "@app/layout/components/order-reports/order-reports.component";
const routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'users',
                canActivate: [AuthGuard],
                data: { expectedRole: [45, 41, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19] },
                loadChildren: () => import('./components/users/users.module')
                    .then(m => m.UsersModule)
            },
            {
                path: 'orders',
                canActivate: [AuthGuard],
                data: { expectedRole: [45, 41, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19] },
                loadChildren: () => import('./components/orders/orders.module')
                    .then(m => m.OrdersModule)
            },
            {
                path: 'orderJson',
                canActivate: [AuthGuard],
                data: { expectedRole: [45, 41, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19] },
                loadChildren: () => import('./components/order-json/order-json.module')
                    .then(m => m.OrderJsonModule)
            },
            {
                path: 'cumulativeReports',
                component: OrderReportsComponent
            }
        ]
    }
];
let LayoutRoutingModule = class LayoutRoutingModule {
};
LayoutRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], LayoutRoutingModule);
export { LayoutRoutingModule };
//# sourceMappingURL=layout-routing.module.js.map
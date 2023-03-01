import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersComponent } from "@app/layout/components/users/users.component";
const routes = [
    {
        path: '',
        component: UsersComponent
    }
];
let UsersRoutingModule = class UsersRoutingModule {
};
UsersRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], UsersRoutingModule);
export { UsersRoutingModule };
//# sourceMappingURL=users-routing.module.js.map
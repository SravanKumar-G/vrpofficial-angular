import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from "@app/login/login.component";
import { AuthGuard } from "@app/guards/auth.guard";
import { SignupComponent } from "@app/signup/signup.component";
const routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '**', redirectTo: '' }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
        exports: [RouterModule],
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map
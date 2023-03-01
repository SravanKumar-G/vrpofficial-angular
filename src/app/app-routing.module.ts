import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "@app/auth/login/login.component";
import {AuthGuard} from "@app/guards/auth.guard";
import {SignupComponent} from "@app/auth/signup/signup.component";
import { HomeComponent } from "@app/home/home.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {expectedRole: [5, 30]},
    loadChildren: () =>
      import('./layout/layout.module').then(m => m.LayoutModule),
  },
  {
    path: 'layout',
    canActivate: [AuthGuard],
    data: {expectedRole: [5, 30]},
    loadChildren: () =>
      import('./layout/layout.module').then(m => m.LayoutModule),
  },
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: ''}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

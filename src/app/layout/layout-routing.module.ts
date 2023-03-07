import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "@app/layout/layout.component";
import {AuthGuard} from "@app/guards/auth.guard";
import {DashboardComponent} from "@app/layout/components/dashboard/dashboard.component";
import {UserProfileComponent} from "@app/layout/components/user-profile/user-profile.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        data: {expectedRole: [5, 30]},
        loadChildren: () => import('./components/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        data: {expectedRole: [30]},
        loadChildren: () => import('./components/users/users.module')
            .then(m => m.UsersModule)
      },
      {
        path: 'user-profile',
        canActivate: [AuthGuard],
        data: {expectedRole: [5]},
        component: UserProfileComponent
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        data: {expectedRole: [5, 30]},
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

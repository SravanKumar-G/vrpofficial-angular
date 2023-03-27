import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "@app/guards/auth.guard";
import {SignupComponent} from "@app/auth/signup/signup.component";
import { HomeComponent } from "@app/home/home.component";
import {AboutComponent} from "@app/about/about.component";
import {HeaderComponent} from "@app/header/header.component";
import {RegistrationComponent} from "@app/registration/registration.component";
import {FooterComponent} from "@app/footer/footer.component";
import {ContactComponent} from "@app/contact/contact.component";
import {GalleryComponent} from "@app/gallery/gallery.component";

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
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'footer',
    component: FooterComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
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

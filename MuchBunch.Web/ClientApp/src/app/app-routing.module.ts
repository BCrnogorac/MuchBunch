import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { BrowseComponent } from './browse/browse.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './account/profile/profile.component';
import { InventoryComponent } from './account/inventory/inventory.component';
import { AddComponent } from './add/add.component';
import { productTypeResolver } from './resolvers/product-type.resolver';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    //canActivate: [AuthGuard]
  },
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'administration', component: AddComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'inventory',
    component: InventoryComponent,
    resolve: {
      types: productTypeResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

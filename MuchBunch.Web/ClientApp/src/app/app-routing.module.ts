import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { BrowseComponent } from './browse/browse.component';
import { AboutComponent } from './about/about.component';
import { AddNewBunchComponent } from './add/add-new-bunch/add-new-bunch.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AddNewItemComponent } from './add/add-new-item/add-new-item.component';
import { InventoryComponent } from './account/inventory/inventory.component';

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
  { path: 'add-new-bunch', component: AddNewBunchComponent },
  { path: 'add-new-item', component: AddNewItemComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'inventory', component: InventoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

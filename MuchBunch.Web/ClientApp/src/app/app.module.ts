import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroModule } from './ng-zorro.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { HomePageComponent } from './home-page/home-page/home-page.component';
import { BrowseComponent } from './browse/browse.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './account/profile/profile.component';
import { InventoryComponent } from './account/inventory/inventory.component';
import { AddComponent } from './add/add.component';
import { AddNewProductModalComponentComponent } from './modals/add-new-product-modal-component/add-new-product-modal-component.component';
import { CodebooksComponent } from './account/codebooks/codebooks.component';
import { UpsertTypesComponent } from './account/codebooks/upsert-types/upsert-types.component';
import { UpsertSubtypesComponent } from './account/codebooks/upsert-subtypes/upsert-subtypes.component';
import { UpsertThemesComponent } from './account/codebooks/upsert-themes/upsert-themes.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    RegisterComponent,
    HomePageComponent,
    BrowseComponent,
    AboutComponent,
    ProfileComponent,
    InventoryComponent,
    AddComponent,
    AddNewProductModalComponentComponent,
    CodebooksComponent,
    UpsertTypesComponent,
    UpsertSubtypesComponent,
    UpsertThemesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}

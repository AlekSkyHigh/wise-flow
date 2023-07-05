import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './core/pages/home/home.component';
import { LoginComponent } from './core/pages/login/login.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { FooterComponent } from './core/footer/footer.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { TvmComponent } from './core/pages/tvm/tvm.component';
import { CurrencyConverterComponent } from './core/pages/currency-converter/currency-converter.component';
import { ContactsComponent } from './core/pages/contacts/contacts.component';
import { AboutComponent } from './core/pages/about/about.component';
import { AddFlowsComponent } from './core/pages/add-flows/add-flows.component';
import { ProfileComponent } from './core/pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    FooterComponent,
    RegisterComponent,
    TvmComponent,
    CurrencyConverterComponent,
    ContactsComponent,
    AboutComponent,
    AddFlowsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
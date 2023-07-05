import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/pages/home/home.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { LoginComponent } from './core/pages/login/login.component';
import { TvmComponent } from './core/pages/tvm/tvm.component';
import { CurrencyConverterComponent } from './core/pages/currency-converter/currency-converter.component';
import { ContactsComponent } from './core/pages/contacts/contacts.component';
import { AboutComponent } from './core/pages/about/about.component';
import { AddFlowsComponent } from './core/pages/add-flows/add-flows.component';
import { ProfileComponent } from './core/pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'add-flows', component: AddFlowsComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full'},
  { path: 'tvm', component: TvmComponent, pathMatch: 'full' },
  { path: 'currency-converter', component: CurrencyConverterComponent, pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

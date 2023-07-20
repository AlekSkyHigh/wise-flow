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
import { onlyForLoggedInGuard } from './guards/only-for-logged-in.guard';
import { onlyForGuestGuard } from './guards/only-for-guest.guard';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { PercentageCalculatorComponent } from './core/pages/percentage-calculator/percentage-calculator.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'register', canActivate: [onlyForGuestGuard], component: RegisterComponent, pathMatch: 'full' },
  { path: 'login', canActivate: [onlyForGuestGuard], component: LoginComponent, pathMatch: 'full' },
  { path: 'add-flows', canActivate: [onlyForLoggedInGuard], component: AddFlowsComponent, pathMatch: 'full' },
  { path: 'profile', canActivate: [onlyForLoggedInGuard], component: ProfileComponent, pathMatch: 'full'},
  { path: 'currency-converter', canActivate: [onlyForLoggedInGuard], component: CurrencyConverterComponent, pathMatch: 'full' },
  { path: 'percentage-calculator', canActivate: [onlyForLoggedInGuard], component: PercentageCalculatorComponent, pathMatch: 'full'},
  { path: 'tvm', canActivate: [onlyForLoggedInGuard], component: TvmComponent, pathMatch: 'full' },
  { path: 'contacts', component: ContactsComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

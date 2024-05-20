import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegularFeeComponent } from './regular-fee/regular-fee.component';
import { ExtraFeeComponent } from './extra-fee/extra-fee.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'regular-fee', component: RegularFeeComponent },
  { path: 'extra-fee', component: ExtraFeeComponent },
  { path: 'success/:type/:id', component: SuccessComponent },
  { path: '**', redirectTo: '/login' }, // Redirect to login page if route not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

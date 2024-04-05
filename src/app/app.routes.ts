import { AdminDashbordComponent } from './Admin/admin-dashbord/admin-dashbord.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "signup", component: SignUpComponent }
  , { path: "login", component: LoginComponent }
  , { path: "dashbord", component: AdminDashbordComponent }];

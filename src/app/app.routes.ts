import { AdminDashbordComponent } from './Admin/admin-dashbord/admin-dashbord.component';
import { AdminSideBarComponent } from './Admin/admin-side-bar/admin-side-bar.component';
import { LesComptesComponent } from './Admin/les-comptes/les-comptes.component';
import { CreatePasswordComponent } from './Authentication/create-password/create-password.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: "signup", component: SignUpComponent }
  , { path: "login", component: LoginComponent }
  , { path: "dashbord", component: AdminDashbordComponent }
  , { path: "createpassword/:code", component: CreatePasswordComponent }
  , { path: "lescomptes", component: LesComptesComponent }

];

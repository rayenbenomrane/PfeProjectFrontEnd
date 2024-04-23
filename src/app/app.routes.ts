import { AdminDashbordComponent } from './Admin/admin-dashbord/admin-dashbord.component';
import { AdminHomePageComponent } from './Admin/admin-home-page/admin-home-page.component';
import { AdminSideBarComponent } from './Admin/admin-side-bar/admin-side-bar.component';
import { LesComptesComponent } from './Admin/les-comptes/les-comptes.component';
import { LescontribuablesComponent } from './Admin/lescontribuables/lescontribuables.component';
import { TableAdminsComponent } from './Admin/table-admins/table-admins.component';
import { CreatePasswordComponent } from './Authentication/create-password/create-password.component';
import { LoginComponent } from './Authentication/login/login.component';
import { SignUpComponent } from './Authentication/sign-up/sign-up.component';
import { Routes } from '@angular/router';
import { ErrorPageComponent } from './ErrorPages/error-page/error-page.component';

export const routes: Routes = [
  { path: "signup", component: SignUpComponent }
  , { path: "login", component: LoginComponent }
  , { path: "inscription", component: AdminDashbordComponent }
  , { path: "createpassword/:code", component: CreatePasswordComponent }
  , { path: "lescomptes", component: LesComptesComponent },
  { path: "lescontribuables", component: LescontribuablesComponent }
  , { path: "lesadmins", component: TableAdminsComponent },
  { path: "dashboard", component: AdminHomePageComponent },
  { path: "error", component: ErrorPageComponent }

];

import { LesImpotsComponent } from './Admin/les-impots/les-impots.component';
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
import { HomePageComponent } from './Client/home-page/home-page.component';
import { ReclamationClientComponent } from './Client/reclamation-client/reclamation-client.component';

import { AjoutImpotComponent } from './Admin/ajout-impot/ajout-impot.component';
import { DetailImpotComponent } from './Admin/detail-impot/detail-impot.component';

export const routes: Routes = [
  { path: "signup", component: SignUpComponent }
  , { path: "login", component: LoginComponent }
  , { path: "admin/inscription", component: AdminDashbordComponent }
  , { path: "createpassword/:code", component: CreatePasswordComponent }
  , { path: "admin/lescomptes", component: LesComptesComponent },
  { path: "admin/lescontribuables", component: LescontribuablesComponent }
  , { path: "admin/lesadmins", component: TableAdminsComponent },
  { path: "admin/dashboard", component: AdminHomePageComponent },
  { path: "error", component: ErrorPageComponent },
  { path: "admin/ajoutlesimpots", component: AjoutImpotComponent },
  { path: "admin/lesimpots", component: LesImpotsComponent },
  { path: "admin/detail-impot/:libelle", component: DetailImpotComponent },
  { path: "admin/ajoutdetail", component: DetailImpotComponent },
  { path: "client/homepage", component: HomePageComponent },
  { path: "client/reclamation", component: ReclamationClientComponent },



];

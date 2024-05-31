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
import { AjoutDetailImpotComponent } from './Admin/ajout-detail-impot/ajout-detail-impot.component';
import { AjoutDeclarationComponent } from './Client/ajout-declaration/ajout-declaration.component';
import { LayoutclientComponent } from './Client/layoutclient/layoutclient.component';
import { MesObligationsComponent } from './Client/mes-obligations/mes-obligations.component';
import { MesDeclarationsComponent } from './Client/mes-declarations/mes-declarations.component';
import { PaymentSuccessComponent } from './Client/payment-success/payment-success.component';
import { PaymentFailureComponent } from './Client/payment-failure/payment-failure.component';
import { DashboardResposnableComponent } from './Responsable/dashboard-resposnable/dashboard-resposnable.component';
import { TousLesReclamationsComponent } from './Responsable/tous-les-reclamations/tous-les-reclamations.component';

import { ReclamationEnAttenteComponent } from './Responsable/reclamation-en-attente/reclamation-en-attente.component';
import { ReclamationEnCoursComponent } from './Responsable/reclamation-en-cours/reclamation-en-cours.component';
import { AuthHomePageComponent } from './Authentication/auth-home-page/auth-home-page.component';
import { ContribuablePageComponent } from './Client/contribuable-page/contribuable-page.component';
import { ResetPasswordComponent } from './Authentication/reset-password/reset-password.component';
import { MesReclamationsComponent } from './Client/mes-reclamations/mes-reclamations.component';

export const routes: Routes = [
  { path: "signup", component: SignUpComponent }
  , { path: "login", component: LoginComponent }
  , { path: "admin/inscription", component: AdminDashbordComponent }
  , { path: "createpassword/:code", component: CreatePasswordComponent }
  , { path: "admin/lescomptes", component: LesComptesComponent },
  { path: "admin/lescontribuables", component: LescontribuablesComponent },
  { path: "", component: AuthHomePageComponent },
  { path: "admin/lesadmins", component: TableAdminsComponent },
  { path: "admin/dashboard", component: AdminHomePageComponent },
  { path: "error", component: ErrorPageComponent },
  { path: "admin/ajoutlesimpots", component: AjoutImpotComponent },
  { path: "admin/lesimpots", component: LesImpotsComponent },
  { path: "admin/detail-impot/:libelle", component: DetailImpotComponent },
  { path: "admin/ajoutdetail/:libelle", component: AjoutDetailImpotComponent },
  { path: "client/homepage", component: HomePageComponent },
  { path: "client/reclamation", component: ReclamationClientComponent },
  { path: "client/ajout-declaration", component: AjoutDeclarationComponent },
  { path: "layout", component: LayoutclientComponent },
  { path: "client/mesobligations", component: MesObligationsComponent },
  { path: "client/mes-declarations", component: MesDeclarationsComponent },
  { path: "client/paiement", component: PaymentSuccessComponent },
  { path: "client/paimenterror", component: PaymentFailureComponent },
  { path: "responsable/dashboard-responsable", component: DashboardResposnableComponent },
  { path: "responsable/tous-les-reclamations", component: TousLesReclamationsComponent },
  { path: "responsable/lesReclamationEnAttente", component: ReclamationEnAttenteComponent },
  { path: "responsable/lesReclamationEnCours", component: ReclamationEnCoursComponent },
  { path: "client/ContribuablePage", component: ContribuablePageComponent },
  { path: "client/mesreclamations", component: MesReclamationsComponent },
  { path: "admin/resetpassword/:email", component: ResetPasswordComponent }



];

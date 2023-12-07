import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { DetailBookComponent } from './components/detail-book/detail-book.component';
import { HomeComponent } from './components/home/home.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RoleGuard } from './services/role.guard';
import { EditBookComponent } from './components/edit-book/edit-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'booklovers/login', pathMatch: 'full' },
  {
    path: "booklovers/login",
    component: LoginComponent,
  },
  {
    path: "booklovers/explorer",
    component: ExplorerComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/detail-book/:id",
    component: DetailBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "booklovers/edit-book/:id",
    component: EditBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "booklovers/home",
    component: HomeComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/my-books",
    component: ExplorerComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/statistic",
    component: StatisticComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "emicol/error",
    component: ErrorPageComponent,
  },
  { path: '**', component: ErrorPageComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  providers: [AuthGuard, RoleGuard]
})
export class AppRoutingModule { }

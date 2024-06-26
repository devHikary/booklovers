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
import { MyBooksComponent } from './components/my-books/my-books.component';
import { MyGoalsComponent } from './components/my-goals/my-goals.component';
import { GoalComponent } from './components/my-goals/goal/goal.component';
import { ReportFailureListComponent } from './components/report-failure-list/report-failure-list.component';
import { ReportFailureComponent } from './components/report-failure-list/report-failure/report-failure.component';
import { ManagementComponent } from './components/management/management.component';
import { PermissionComponent } from './components/permission-list/permission/permission.component';
import { PermissionListComponent } from './components/permission-list/permission-list.component';
import { RoleComponent } from './components/role-list/role/role.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { ErrorUnavailableComponent } from './components/error-unavailable/error-unavailable.component';
import { ThemeComponent } from './components/theme-list/theme/theme.component';
import { ThemeListComponent } from './components/theme-list/theme-list.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { AuthorComponent } from './components/author-list/author/author.component';

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
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/edit-book/:id",
    component: EditBookComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/home",
    component: HomeComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/my-books",
    component: MyBooksComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/statistic",
    component: StatisticComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/error",
    component: ErrorPageComponent,
  },
  {
    path: "booklovers/errorUnavailable",
    component: ErrorUnavailableComponent,
  },
  {
    path: "booklovers/my-goals",
    component: MyGoalsComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/goal/:id",
    component: GoalComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/adm/report-failure-list",
    component: ReportFailureListComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/report-failure",
    component: ReportFailureComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/management",
    component: ManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/permission/:id",
    component: PermissionComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/permission-list",
    component: PermissionListComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/role/:id",
    component: RoleComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/role-list",
    component: RoleListComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/theme/:id",
    component: ThemeComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/theme-list",
    component: ThemeListComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/author/:id",
    component: AuthorComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: "booklovers/author-list",
    component: AuthorListComponent,
    canActivate: [AuthGuard, RoleGuard],
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

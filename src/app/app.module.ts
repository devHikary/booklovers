import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule, NgbCollapseModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbModule, NgbProgressbarModule, NgbRatingModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { CardBoxVComponent } from './components/card-box-v/card-box-v.component';
import { RatingComponent } from './components/rating/rating.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailBookComponent } from './components/detail-book/detail-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomAdapter, CustomDateParserFormatter, CustomDatepickerI18n, I18n } from './services/custom-datapicker.service';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { CardBoxHComponent } from './components/card-box-h/card-box-h.component';
import { HomeComponent } from './components/home/home.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { NgChartsModule } from 'ng2-charts';
import { CardBoxMiniComponent } from './components/card-box-mini/card-box-mini.component';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { Interceptor } from './services/interceptor.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HeaderNavComponent } from './shared/header-nav/header-nav.component';
import { MyBooksComponent } from './components/my-books/my-books.component';
import {MatSelectModule} from '@angular/material/select';
import { MyGoalsComponent } from './components/my-goals/my-goals.component';
import { GoalComponent } from './components/my-goals/goal/goal.component';
import { CardGoalHComponent } from './components/card-goal-h/card-goal-h.component';
import { ReportFailureListComponent } from './components/report-failure-list/report-failure-list.component';
import { ReportFailureComponent } from './components/report-failure-list/report-failure/report-failure.component';
import { HeaderService } from './services/header.service';
import { ManagementComponent } from './components/management/management.component';
import { PermissionListComponent } from './components/permission-list/permission-list.component';
import { PermissionComponent } from './components/permission-list/permission/permission.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleComponent } from './components/role-list/role/role.component';
import { ToastGlobalComponent } from './shared/toast-global/toast-global.component';

@NgModule({
  declarations: [
    AppComponent,
    ExplorerComponent,
    CardBoxVComponent,
    RatingComponent,
    DetailBookComponent,
    SideNavComponent,
    CardBoxHComponent,
    HomeComponent,
    StatisticComponent,
    CardBoxMiniComponent,
    LoginComponent,
    ErrorPageComponent,
    EditBookComponent,
    HeaderNavComponent,
    MyBooksComponent,
    MyGoalsComponent,
    GoalComponent,
    CardGoalHComponent,
    ReportFailureListComponent,
    ReportFailureComponent,
    ManagementComponent,
    PermissionListComponent,
    PermissionComponent,
    RoleListComponent,
    RoleComponent,
    ToastGlobalComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbRatingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    JsonPipe,
    NgbProgressbarModule,
    NgChartsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    NgFor,
    AsyncPipe,
    BrowserAnimationsModule,
    NgbCollapseModule,
    MatSelectModule,
    NgbCarouselModule,
    NgbToastModule,
  ],
  providers: [
    [{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },],
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    HeaderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

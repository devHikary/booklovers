import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCollapseModule, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbModule, NgbProgressbarModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
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
  ],
  providers: [
    [{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },],
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

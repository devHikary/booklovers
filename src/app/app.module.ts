import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerI18n, NgbDatepickerModule, NgbModule, NgbProgressbarModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { CardBoxVComponent } from './components/card-box-v/card-box-v.component';
import { RatingComponent } from './components/rating/rating.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailBookComponent } from './components/detail-book/detail-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomAdapter, CustomDateParserFormatter, CustomDatepickerI18n, I18n } from './services/custom-datapicker.service';
import { JsonPipe } from '@angular/common';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { CardBoxHComponent } from './components/card-box-h/card-box-h.component';
import { HomeComponent } from './components/home/home.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { NgChartsModule } from 'ng2-charts';

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
  ],
  providers: [
    [{ provide: NgbDateAdapter, useClass: CustomAdapter },
		{ provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },],
    [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

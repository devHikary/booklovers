import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { DetailBookComponent } from './components/detail-book/detail-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'booklovers/explorer', pathMatch: 'full' },
  {
    path: "booklovers/explorer",
    component: ExplorerComponent,
  },
  {
    path: "booklovers/detail-book/:id",
    component: DetailBookComponent,
  },
]

@NgModule({
  declarations: [],
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  providers: []
})
export class AppRoutingModule { }

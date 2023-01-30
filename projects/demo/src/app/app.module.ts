import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SmartIntelTableModule } from 'smart-intel-table';
import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { ScrollPositionDirective } from './theme/directives/scrollPosition.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScrollPositionDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
    SmartIntelTableModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

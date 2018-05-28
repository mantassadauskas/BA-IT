import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FrontpageComponent} from './components/frontpage/frontpage.component';
import {RouterModule, Routes} from "@angular/router";
import {ExampleComponent} from './components/example/example.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgDatepickerModule} from 'ng2-datepicker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes: Routes = [
  {path: 'example', component: ExampleComponent, data: {page: 'one'}},
  {path: '**', component: FrontpageComponent, data: {page: 'two'}},

];

@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    ExampleComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgDatepickerModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

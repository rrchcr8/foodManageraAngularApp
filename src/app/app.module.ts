import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StarComponent } from './star/star.component';




@NgModule({
  declarations: [
    AppComponent,
    StarComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule, NgbModule
    
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

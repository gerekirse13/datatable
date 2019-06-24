import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { GrdFilterPipe } from './grd-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
	GrdFilterPipe
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

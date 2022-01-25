import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TokenPageComponent } from './token-page/token-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { SearchPageGuard } from './guards/search-page.guard';


@NgModule({
    declarations: [
        AppComponent,
        TokenPageComponent,
        SearchPageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MaterialModule,
        AppRoutingModule
    ],
    providers: [SearchPageGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}

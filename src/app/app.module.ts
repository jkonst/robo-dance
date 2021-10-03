import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexModule} from '@angular/flex-layout';
import {FooterComponent} from '@src/app/footer/footer.component';
import {HeaderComponent} from '@src/app/header/header.component';
import {IsLeaderboardActivePipe} from './pipes/is-leaderboard-active.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FooterComponent,
        HeaderComponent,
        IsLeaderboardActivePipe,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        FlexModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BannerComponent } from './components/banner/banner.component';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { RouterModule } from '@angular/router';





@NgModule({
    declarations: [


        HeaderComponent,
        FooterComponent,
        NavBarComponent,
        BannerComponent,
        Error404PageComponent,

    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        FooterComponent,
        NavBarComponent,
        BannerComponent,
        HeaderComponent,
        Error404PageComponent,


    ]
})
export class SharedModule { }

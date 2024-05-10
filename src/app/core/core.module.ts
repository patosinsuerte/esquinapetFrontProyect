import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { HomeComponent } from './components/home/home.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { SharedModule } from '../shared/shared.module';
import { CardServicesComponent } from './components/card-services/card-services.component';
import { MovilCarouselComponent } from './components/movil-carousel/movil-carousel.component';
import { DesktopCarouselComponent } from './components/desktop-carousel/desktop-carousel.component';


@NgModule({
    declarations: [
        LayoutPageComponent,
        HomeComponent,
        OurServicesComponent,
        AboutComponent,
        ContactComponent,
        CardServicesComponent,
        MovilCarouselComponent,
        DesktopCarouselComponent
    ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule
    ]
})
export class CoreModule { }

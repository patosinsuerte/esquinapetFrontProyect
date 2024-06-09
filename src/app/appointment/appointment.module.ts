import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CreateAppointmentComponent } from './pages/create-appointment/create-appointment.component';
import { HeaderComponent } from './components/header/header.component';
import { NavBarAppointmentComponent } from './components/nav-bar-appointment/nav-bar-appointment.component';
import { MaterialModule } from '../material/material.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AvalibleTimeComponent } from './components/avalible-time/avalible-time.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
    declarations: [
        LayoutPageComponent,
        CreateAppointmentComponent,
        HeaderComponent,
        NavBarAppointmentComponent,
        CalendarComponent,
        AvalibleTimeComponent
    ],
    imports: [
        CommonModule,
        AppointmentRoutingModule,
        MaterialModule,
        ReactiveFormsModule,
        PipesModule
    ]
})
export class AppointmentModule { }

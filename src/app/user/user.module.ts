import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { MyAppointmetsComponent } from './pages/my-appointmets/my-appointmets.component';


@NgModule({
    declarations: [
        LayoutPageComponent,
        MyAppointmetsComponent,

    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        RouterModule,
        MaterialModule
    ]
})
export class UserModule { }

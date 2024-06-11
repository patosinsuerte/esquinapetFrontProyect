import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { MyAppointmetsComponent } from './pages/my-appointmets/my-appointmets.component';
import { PipesModule } from '../pipes/pipes.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        LayoutPageComponent,
        MyAppointmetsComponent,
        UserPageComponent,
        UserEditComponent

    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        RouterModule,
        MaterialModule,
        PipesModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }

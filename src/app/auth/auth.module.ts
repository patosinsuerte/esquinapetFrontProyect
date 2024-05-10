import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

import { RouterModule } from '@angular/router';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthNavBarComponent } from './components/auth-nav-bar/auth-nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        LoginPageComponent,
        RegisterPageComponent,
        LayoutPageComponent,
        AuthHeaderComponent,
        AuthNavBarComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { authGuard } from './auth/guards/auth.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { createAppointmentGuard } from './appointment/guards/create-appointment.guard';

const routes: Routes = [

    {
        canActivate: [isNotAuthenticatedGuard],
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

    },
    {
        canActivate: [authGuard],
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.UserModule)

    },
    {
        canActivate: [createAppointmentGuard],
        path: 'appointments',
        loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentModule)

    },
    {
        path: '',
        loadChildren: () => import('./core/core.module').then(m => m.CoreModule),
        pathMatch: 'full'

    },
    {
        path: '**',
        component: Error404PageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

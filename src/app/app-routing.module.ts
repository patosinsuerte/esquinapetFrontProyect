import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)

    },
    {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)

    },
    {
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

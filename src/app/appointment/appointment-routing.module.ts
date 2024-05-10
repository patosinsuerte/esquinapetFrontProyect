import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CreateAppointmentComponent } from './pages/create-appointment/create-appointment.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            {
                path: 'create',
                component: CreateAppointmentComponent
            },
            {
                path: '**',
                redirectTo: 'create'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppointmentRoutingModule { }

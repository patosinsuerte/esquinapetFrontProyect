import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MyAppointmetsComponent } from './pages/my-appointmets/my-appointmets.component';
import { UserPageComponent } from './pages/user-page/user-page.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            {
                path: 'appointments',
                component: MyAppointmetsComponent
            },
            {
                path: 'user',
                component: UserPageComponent
            },
            {
                path: '**',
                redirectTo: 'appointments'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }

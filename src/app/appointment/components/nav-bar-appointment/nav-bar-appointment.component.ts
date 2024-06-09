import { Component, HostListener, computed } from '@angular/core';
import { NavBarService } from '../../../shared/services/navbar.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces/authStatus.enum';

@Component({
    selector: 'appointment-nav-bar-appointment',
    templateUrl: './nav-bar-appointment.component.html',
    styleUrl: './nav-bar-appointment.component.scss'
})
export class NavBarAppointmentComponent {
    constructor(
        public navBarService: NavBarService,
        private authService: AuthService
    ) { }


    public sessionStatus = computed(() => this.authService.authStatus());
    public statusValues = AuthStatus;

    offNavMenu(): void {
        this.navBarService.navBarIsActive = !this.navBarService.navBarIsActive;
    }


    offOpacity(): void {
        this.navBarService.opacity = !this.navBarService.opacity;
    }


    // esconder el menu y la opacidad
    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent) {
        if (!this.navBarService.navBarIsActive) {
            return;
        }
        const targetElement = event.target as HTMLElement;
        if (targetElement.closest('.menu-opacity')) {
            this.navBarService.navBarIsActive = false;
            this.navBarService.opacity = false;
        }
    }





}

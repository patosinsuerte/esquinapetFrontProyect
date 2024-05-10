import { Component, HostListener } from '@angular/core';
import { NavBarService } from '../../../shared/services/navbar.service';



@Component({
    selector: 'auth-nav-bar',
    templateUrl: './auth-nav-bar.component.html',
    styleUrl: './auth-nav-bar.component.scss'
})
export class AuthNavBarComponent {
    constructor(
        public navBarService: NavBarService,
    ) { }


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

import { Component, HostListener, OnInit } from '@angular/core';
import { NavBarService } from '../../../shared/services/navbar.service';
import { ActivateLinkColorService } from '../../../shared/services/activateLinkColor.service';
import { Router } from '@angular/router';



@Component({
    selector: 'auth-nav-bar',
    templateUrl: './auth-nav-bar.component.html',
    styleUrl: './auth-nav-bar.component.scss'
})
export class AuthNavBarComponent {
    constructor(
        private activeLinkService: ActivateLinkColorService,
        public navBarService: NavBarService,
        private router: Router
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





    get activeLink() {
        return this.activeLinkService.activeLink;
    }

    setLoginLink() {
        this.activeLinkService.setLoginLink();

    }

    setRegisterLink() {
        this.activeLinkService.setRegister();

    }


}

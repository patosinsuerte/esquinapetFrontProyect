import { Component, HostListener, OnInit } from '@angular/core';

import { NavBarService } from '../../../shared/services/navbar.service';

@Component({
    selector: 'auth-header',
    templateUrl: './auth-header.component.html',
    styleUrl: './auth-header.component.scss'
})
export class AuthHeaderComponent {

    constructor(
        public navBarService: NavBarService,
    ) { }




    toggleNavBar(): void {
        this.navBarService.navBarIsActive = !this.navBarService.navBarIsActive;
    }


    toggleOpacity(): void {
        this.navBarService.opacity = !this.navBarService.opacity;
    }



    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

}

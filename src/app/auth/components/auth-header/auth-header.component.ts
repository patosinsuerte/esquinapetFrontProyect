import { Component, HostListener, OnInit, computed, signal } from '@angular/core';

import { NavBarService } from '../../../shared/services/navbar.service';
import { ActivateLinkColorService } from '../../../shared/services/activateLinkColor.service';
import { Router } from '@angular/router';

@Component({
    selector: 'auth-header',
    templateUrl: './auth-header.component.html',
    styleUrl: './auth-header.component.scss'
})
export class AuthHeaderComponent implements OnInit {


    constructor(
        public navBarService: NavBarService,
        private activeLinkService: ActivateLinkColorService,
        private router: Router
    ) { }



    ngOnInit(): void {
        const currentUrl = this.router.url;
        if (currentUrl == '/auth/login') {
            this.activeLinkService.activeLink = 4;
        }

        if (currentUrl == '/auth/register') {
            this.activeLinkService.activeLink = 5;
        }
    }


    get activeLink() {
        return this.activeLinkService.activeLink;
    }




    toggleNavBar(): void {
        this.navBarService.navBarIsActive = !this.navBarService.navBarIsActive;
    }


    toggleOpacity(): void {
        this.navBarService.opacity = !this.navBarService.opacity;
    }



    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    setLoginLink() {
        this.activeLinkService.setLoginLink();

    }

    setRegisterLink() {
        this.activeLinkService.setRegister();

    }

}

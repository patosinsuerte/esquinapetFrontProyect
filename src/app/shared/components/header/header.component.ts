import { Component, HostListener, OnInit, computed, signal } from '@angular/core';
import { NavBarService } from '../../services/navbar.service';
import { ScrollService } from '../../services/scroll.service';
import { ActivateLinkColorService } from '../../services/activateLinkColor.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces/authStatus.enum';
import { Router } from '@angular/router';

@Component({
    selector: 'shared-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    private scrollTimeout: any;

    constructor(
        private navBarService: NavBarService,
        private scrollService: ScrollService,
        private authService: AuthService,
        private activateLinkColorService: ActivateLinkColorService,
        private activeLinkService: ActivateLinkColorService,
        private router: Router

    ) { }

    public authStatus = computed(() => this.authService.authStatus());
    public statusValues = AuthStatus;




    ngOnInit(): void {
        const currentUrl = this.router.url;
        if (currentUrl == '/') {
            this.activeLinkService.activeLink = 0;
        }
        this.activateLinkColorService.setCurrentSection();
    }

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.activateLinkColorService.setCurrentSection();
        }, 95);
    }

    toggleNavBar(): void {
        this.navBarService.navBarIsActive = !this.navBarService.navBarIsActive;
    }


    toggleOpacity(): void {
        this.navBarService.opacity = !this.navBarService.opacity;
    }


    // navegar hacia una seccion
    scrollTo(id: string) {
        this.scrollService.scrollToElement(id);
    }


    get getActiveLink(): number {
        return this.activateLinkColorService.activeLink;
    }




    //activar color del link al dar click
    setHomeLink() {
        this.activateLinkColorService.setHomeLink();
    }
    setAboutLink() {
        this.activateLinkColorService.setAboutLink();
    }
    setServiceLink() {
        this.activateLinkColorService.setServiceLink();
    }
    setContactLink() {
        this.activateLinkColorService.setContactLink();
    }


    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

}

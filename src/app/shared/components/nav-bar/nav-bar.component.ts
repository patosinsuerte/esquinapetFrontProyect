import { Component, HostListener, computed } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { ActivateLinkColorService } from '../../services/activateLinkColor.service';
import { NavBarService } from '../../services/navbar.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces/authStatus.enum';

@Component({
    selector: 'shared-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
    constructor(
        public navBarService: NavBarService,
        private activeLinkService: ActivateLinkColorService,
        private authService: AuthService,
        private scrollService: ScrollService
    ) { }

    // signal del estado
    public authStatus = computed(() => this.authService.authStatus());

    public statusValues = AuthStatus;


    ngOnInit(): void {
        this.activeLinkService.setCurrentSection();
    }

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


    scrollTo(id: string): void {
        this.scrollService.scrollToElement(id);
    }




    // identificadores

    get getActiveLink(): number {
        return this.activeLinkService.activeLink;
    }

    //activar color del link al dar click
    setHomeLink() {
        this.activeLinkService.setHomeLink();
    }
    setAboutLink() {
        this.activeLinkService.setAboutLink();
    }
    setServiceLink() {
        this.activeLinkService.setServiceLink();
    }
    setContactLink() {
        this.activeLinkService.setContactLink();
    }


}

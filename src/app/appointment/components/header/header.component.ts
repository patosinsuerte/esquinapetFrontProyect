import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../../shared/services/navbar.service';
import { ActivateLinkColorService } from '../../../shared/services/activateLinkColor.service';
import { ScrollService } from '../../../shared/services/scroll.service';



@Component({
    selector: 'appointment-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    constructor(
        public navBarService: NavBarService,
        private activateLinkService: ActivateLinkColorService,
        private scrollService: ScrollService

    ) { }

    ngOnInit(): void {
        this.scrollService.scrollToTop();
    }


    toggleNavBar(): void {
        this.navBarService.navBarIsActive = !this.navBarService.navBarIsActive;
    }


    toggleOpacity(): void {
        this.navBarService.opacity = !this.navBarService.opacity;
    }



    get appointmentValue(): number {
        return this.activateLinkService.getAppointmentValue;
    }

    public setColorLink() {
        this.activateLinkService.setColorLinkAppointment();
    }

}

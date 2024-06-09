import { Component, computed } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';
import { AuthService } from '../../../auth/services/auth.service';
import { AuthStatus } from '../../../auth/interfaces/authStatus.enum';

@Component({
    selector: 'shared-banner',
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent {
    constructor(
        private scrollService: ScrollService,
        private authService: AuthService
    ) {

    }


    public authStatus = computed(() => this.authService.authStatus());
    public authStautsValues = AuthStatus;


    scrollTo(id: string) {
        this.scrollService.scrollToElement(id);
    }
}

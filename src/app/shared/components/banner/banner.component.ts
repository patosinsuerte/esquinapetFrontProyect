import { Component } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
    selector: 'shared-banner',
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent {
    constructor(
        private scrollService: ScrollService
    ) {

    }

    scrollTo(id: string) {
        this.scrollService.scrollToElement(id);
    }
}

import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../../../shared/services/scroll.service';

@Component({
    selector: 'app-layout-page',
    templateUrl: './layout-page.component.html',
    styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent implements OnInit {

    constructor(private scrollService: ScrollService) { }


    ngOnInit(): void {
        this.scrollService.scrollToTop()
    }

}

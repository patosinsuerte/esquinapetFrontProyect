import { Component, OnInit } from '@angular/core';
import { ActivateLinkColorService } from '../../../shared/services/activateLinkColor.service';
import { ScrollService } from '../../../shared/services/scroll.service';



@Component({
    selector: 'auth-login-page',
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

    constructor(private scrollService: ScrollService) { }


    ngOnInit(): void {
        this.scrollService.scrollToTop();
    }


}

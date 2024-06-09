import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserResponseDTO } from '../../../auth/interfaces/userResponseDTO.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout-page',
    templateUrl: './layout-page.component.html',
    styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

    private authService: AuthService = inject(AuthService);
    public currentUser = computed(() => this.authService.currentUser());


    logout() {
        this.authService.logout();
    }




}

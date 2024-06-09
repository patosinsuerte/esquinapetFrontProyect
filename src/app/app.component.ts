import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces/authStatus.enum';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {

    title = 'Esquina Pet';

    private authService: AuthService = inject(AuthService);
    private router: Router = inject(Router);
    public authStatus = computed(() => this.authService.authStatus());
    public status = AuthStatus;







    public finishedAuthStatusChecking() {

        if (this.authService.authStatus() === AuthStatus.CHECKING) {
            return false;
        }
        return true;
    }

    public authStatusChangedEffect = effect(() => {
        switch (this.authService.authStatus()) {
            case AuthStatus.CHECKING:
                return;
            case AuthStatus.AUTHENTICATED:
                this.router.navigateByUrl('/dashboard');
                return;
            case AuthStatus.NOTAUTHENTICATED:
                this.router.navigateByUrl('/');
                return;
        }
    });



}
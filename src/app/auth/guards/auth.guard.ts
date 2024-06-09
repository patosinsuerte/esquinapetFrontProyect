import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces/authStatus.enum';


export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.AUTHENTICATED) {
    return true;
  }

  if (authService.authStatus() === AuthStatus.CHECKING) {
    return false;
  }


  router.navigateByUrl('/auth/login');
  return false;








};

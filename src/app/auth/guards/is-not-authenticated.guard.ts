import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { AuthStatus } from '../interfaces/authStatus.enum';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.AUTHENTICATED) {
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;

};

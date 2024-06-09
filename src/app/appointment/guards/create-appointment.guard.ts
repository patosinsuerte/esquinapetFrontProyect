import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { AuthStatus } from '../../auth/interfaces/authStatus.enum';

export const createAppointmentGuard: CanActivateFn = (route, state) => {
  // Verifica si el usuario está autenticado


  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.AUTHENTICATED) {
    return true; // Permite la navegación a /appointment/create
  } else {
    // Si no está autenticado, redirige a la página de inicio de sesión
    router.navigateByUrl('/auth/login');
    return false;
  }
};
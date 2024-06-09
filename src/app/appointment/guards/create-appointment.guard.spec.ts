import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { createAppointmentGuard } from './create-appointment.guard';

describe('createAppointmentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => createAppointmentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

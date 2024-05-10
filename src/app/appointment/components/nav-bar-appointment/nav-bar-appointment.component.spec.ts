import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAppointmentComponent } from './nav-bar-appointment.component';

describe('NavBarAppointmentComponent', () => {
  let component: NavBarAppointmentComponent;
  let fixture: ComponentFixture<NavBarAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavBarAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavBarAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

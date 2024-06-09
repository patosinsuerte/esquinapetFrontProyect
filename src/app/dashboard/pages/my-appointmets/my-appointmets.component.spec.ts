import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppointmetsComponent } from './my-appointmets.component';

describe('MyAppointmetsComponent', () => {
  let component: MyAppointmetsComponent;
  let fixture: ComponentFixture<MyAppointmetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyAppointmetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAppointmetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

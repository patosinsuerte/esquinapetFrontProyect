import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalibleTimeComponent } from './avalible-time.component';

describe('AvalibleTimeComponent', () => {
  let component: AvalibleTimeComponent;
  let fixture: ComponentFixture<AvalibleTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvalibleTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvalibleTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovilCarouselComponent } from './movil-carousel.component';

describe('MovilCarouselComponent', () => {
  let component: MovilCarouselComponent;
  let fixture: ComponentFixture<MovilCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovilCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovilCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

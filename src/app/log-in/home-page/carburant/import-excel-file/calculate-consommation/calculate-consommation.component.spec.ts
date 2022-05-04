import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateConsommationComponent } from './calculate-consommation.component';

describe('CalculateConsommationComponent', () => {
  let component: CalculateConsommationComponent;
  let fixture: ComponentFixture<CalculateConsommationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculateConsommationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateConsommationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

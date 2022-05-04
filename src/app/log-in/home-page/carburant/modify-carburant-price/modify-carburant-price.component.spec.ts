import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCarburantPriceComponent } from './modify-carburant-price.component';

describe('ModifyCarburantPriceComponent', () => {
  let component: ModifyCarburantPriceComponent;
  let fixture: ComponentFixture<ModifyCarburantPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCarburantPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCarburantPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

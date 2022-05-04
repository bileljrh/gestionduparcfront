import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParametresVehiculesComponent} from './parametres-vehicules.component';

describe('ParametresVehiculesComponent', () => {
  let component: ParametresVehiculesComponent;
  let fixture: ComponentFixture<ParametresVehiculesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParametresVehiculesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametresVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

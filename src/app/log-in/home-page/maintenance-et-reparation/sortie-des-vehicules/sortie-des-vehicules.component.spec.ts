import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SortieDesVehiculesComponent} from './sortie-des-vehicules.component';

describe('SortieDesVehiculesComponent', () => {
  let component: SortieDesVehiculesComponent;
  let fixture: ComponentFixture<SortieDesVehiculesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SortieDesVehiculesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortieDesVehiculesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

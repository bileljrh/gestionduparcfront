import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionsPertesComponent } from './gestions-pertes.component';

describe('GestionsPertesComponent', () => {
  let component: GestionsPertesComponent;
  let fixture: ComponentFixture<GestionsPertesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionsPertesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionsPertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

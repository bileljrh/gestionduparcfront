import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPerteCarteComponent } from './modify-perte-carte.component';

describe('ModifyPerteCarteComponent', () => {
  let component: ModifyPerteCarteComponent;
  let fixture: ComponentFixture<ModifyPerteCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPerteCarteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPerteCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyTaxeCirculationComponent} from './modify-taxe-circulation.component';

describe('ModifyTaxeCirculationComponent', () => {
  let component: ModifyTaxeCirculationComponent;
  let fixture: ComponentFixture<ModifyTaxeCirculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyTaxeCirculationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTaxeCirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

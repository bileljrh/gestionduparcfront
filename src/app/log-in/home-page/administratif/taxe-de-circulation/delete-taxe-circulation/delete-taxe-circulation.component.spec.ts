import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteTaxeCirculationComponent} from './delete-taxe-circulation.component';

describe('DeleteTaxeCirculationComponent', () => {
  let component: DeleteTaxeCirculationComponent;
  let fixture: ComponentFixture<DeleteTaxeCirculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTaxeCirculationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTaxeCirculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

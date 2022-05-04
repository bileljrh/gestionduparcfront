import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyEtatStockComponent} from './modify-etat-stock.component';

describe('ModifyEtatStockComponent', () => {
  let component: ModifyEtatStockComponent;
  let fixture: ComponentFixture<ModifyEtatStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyEtatStockComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyEtatStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewEtatStockComponent} from './new-etat-stock.component';

describe('NewEtatStockComponent', () => {
  let component: NewEtatStockComponent;
  let fixture: ComponentFixture<NewEtatStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewEtatStockComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEtatStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

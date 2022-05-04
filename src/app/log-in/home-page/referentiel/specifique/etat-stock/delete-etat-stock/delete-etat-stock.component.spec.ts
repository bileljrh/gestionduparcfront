import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteEtatStockComponent} from './delete-etat-stock.component';

describe('DeleteEtatStockComponent', () => {
  let component: DeleteEtatStockComponent;
  let fixture: ComponentFixture<DeleteEtatStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteEtatStockComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteEtatStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

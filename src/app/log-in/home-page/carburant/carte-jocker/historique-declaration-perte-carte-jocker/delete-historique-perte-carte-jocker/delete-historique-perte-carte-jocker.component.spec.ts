import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHistoriquePerteCarteJockerComponent } from './delete-historique-perte-carte-jocker.component';

describe('DeleteHistoriquePerteCarteJockerComponent', () => {
  let component: DeleteHistoriquePerteCarteJockerComponent;
  let fixture: ComponentFixture<DeleteHistoriquePerteCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteHistoriquePerteCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHistoriquePerteCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

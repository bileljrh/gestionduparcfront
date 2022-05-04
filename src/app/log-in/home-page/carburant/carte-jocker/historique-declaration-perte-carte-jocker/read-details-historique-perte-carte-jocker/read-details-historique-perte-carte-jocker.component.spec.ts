import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadDetailsHistoriquePerteCarteJockerComponent } from './read-details-historique-perte-carte-jocker.component';

describe('ReadDetailsHistoriquePerteCarteJockerComponent', () => {
  let component: ReadDetailsHistoriquePerteCarteJockerComponent;
  let fixture: ComponentFixture<ReadDetailsHistoriquePerteCarteJockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadDetailsHistoriquePerteCarteJockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadDetailsHistoriquePerteCarteJockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

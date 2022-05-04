import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticesForTransfertToVirtualMagasinComponent } from './artices-for-transfert-to-virtual-magasin.component';

describe('ArticesForTransfertToVirtualMagasinComponent', () => {
  let component: ArticesForTransfertToVirtualMagasinComponent;
  let fixture: ComponentFixture<ArticesForTransfertToVirtualMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticesForTransfertToVirtualMagasinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticesForTransfertToVirtualMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

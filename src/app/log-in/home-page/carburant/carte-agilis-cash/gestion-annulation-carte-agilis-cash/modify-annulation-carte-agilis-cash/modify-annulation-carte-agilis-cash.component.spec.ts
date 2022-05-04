import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyAnnulationCarteAgilisCashComponent} from './modify-annulation-carte-agilis-cash.component';

describe('ModifyAnnulationCarteAgilisCashComponent', () => {
  let component: ModifyAnnulationCarteAgilisCashComponent;
  let fixture: ComponentFixture<ModifyAnnulationCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyAnnulationCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAnnulationCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyAnnulationCartePlafondComponent} from './modify-annulation-carte-plafond.component';

describe('ModifyAnnulationCartePlafondComponent', () => {
  let component: ModifyAnnulationCartePlafondComponent;
  let fixture: ComponentFixture<ModifyAnnulationCartePlafondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyAnnulationCartePlafondComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAnnulationCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

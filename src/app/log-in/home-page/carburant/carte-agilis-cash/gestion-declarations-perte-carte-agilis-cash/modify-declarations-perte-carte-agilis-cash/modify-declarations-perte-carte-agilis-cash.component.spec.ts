import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyDeclarationsPerteCarteAgilisCashComponent} from './modify-declarations-perte-carte-agilis-cash.component';

describe('ModifyDeclarationsPerteCarteAgilisCashComponent', () => {
  let component: ModifyDeclarationsPerteCarteAgilisCashComponent;
  let fixture: ComponentFixture<ModifyDeclarationsPerteCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyDeclarationsPerteCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDeclarationsPerteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

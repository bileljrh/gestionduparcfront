import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteDeclarationsPerteCarteAgilisCashComponent} from './delete-declarations-perte-carte-agilis-cash.component';

describe('DeleteDeclarationsPerteCarteAgilisCashComponent', () => {
  let component: DeleteDeclarationsPerteCarteAgilisCashComponent;
  let fixture: ComponentFixture<DeleteDeclarationsPerteCarteAgilisCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDeclarationsPerteCarteAgilisCashComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDeclarationsPerteCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

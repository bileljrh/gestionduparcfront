import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EtatsDeSortieComponent} from './etats-de-sortie.component';

describe('EtatsDeSortieComponent', () => {
  let component: EtatsDeSortieComponent;
  let fixture: ComponentFixture<EtatsDeSortieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EtatsDeSortieComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatsDeSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

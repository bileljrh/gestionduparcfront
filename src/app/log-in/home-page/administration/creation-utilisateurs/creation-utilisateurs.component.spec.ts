import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreationUtilisateursComponent} from './creation-utilisateurs.component';

describe('CreationUtilisateursComponent', () => {
  let component: CreationUtilisateursComponent;
  let fixture: ComponentFixture<CreationUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreationUtilisateursComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

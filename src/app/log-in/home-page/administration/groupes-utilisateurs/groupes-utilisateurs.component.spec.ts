import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GroupesUtilisateursComponent} from './groupes-utilisateurs.component';

describe('GroupesUtilisateursComponent', () => {
  let component: GroupesUtilisateursComponent;
  let fixture: ComponentFixture<GroupesUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupesUtilisateursComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupesUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRechargeSousCompteComponent } from './delete-recharge-sous-compte.component';

describe('DeleteRechargeSousCompteComponent', () => {
  let component: DeleteRechargeSousCompteComponent;
  let fixture: ComponentFixture<DeleteRechargeSousCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRechargeSousCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRechargeSousCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

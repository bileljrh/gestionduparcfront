import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteBonTravailComponent} from './delete-bon-travail.component';

describe('DeleteBonTravailComponent', () => {
  let component: DeleteBonTravailComponent;
  let fixture: ComponentFixture<DeleteBonTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteBonTravailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBonTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

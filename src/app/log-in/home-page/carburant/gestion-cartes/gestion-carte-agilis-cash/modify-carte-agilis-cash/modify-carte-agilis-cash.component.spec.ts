import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyCarteAgilisCashComponent} from './modify-carte-agilis-cash.component';

describe('ModifyCarteAgilisCashComponent', () => {
  let component: ModifyCarteAgilisCashComponent;
  let fixture: ComponentFixture<ModifyCarteAgilisCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyCarteAgilisCashComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCarteAgilisCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

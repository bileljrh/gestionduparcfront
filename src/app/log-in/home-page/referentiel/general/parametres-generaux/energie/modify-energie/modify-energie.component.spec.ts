import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyEnergieComponent} from './modify-energie.component';

describe('ModifyEnergieComponent', () => {
  let component: ModifyEnergieComponent;
  let fixture: ComponentFixture<ModifyEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyEnergieComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

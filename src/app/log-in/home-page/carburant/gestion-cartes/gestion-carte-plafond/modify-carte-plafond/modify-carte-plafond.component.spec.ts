import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyCartePlafondComponent} from './modify-carte-plafond.component';

describe('ModifyCartePlafondComponent', () => {
  let component: ModifyCartePlafondComponent;
  let fixture: ComponentFixture<ModifyCartePlafondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyCartePlafondComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCartePlafondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

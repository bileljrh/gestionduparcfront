import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyTvaComponent} from './modify-tva.component';

describe('ModifyTvaComponent', () => {
  let component: ModifyTvaComponent;
  let fixture: ComponentFixture<ModifyTvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyTvaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyTvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

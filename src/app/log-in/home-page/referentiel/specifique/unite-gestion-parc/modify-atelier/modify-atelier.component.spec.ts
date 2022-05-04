import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyAtelierComponent} from './modify-atelier.component';

describe('ModifyAtelierComponent', () => {
  let component: ModifyAtelierComponent;
  let fixture: ComponentFixture<ModifyAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyAtelierComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

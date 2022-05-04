import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyReformeComponent} from './modify-reforme.component';

describe('ModifyReformeComponent', () => {
  let component: ModifyReformeComponent;
  let fixture: ComponentFixture<ModifyReformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyReformeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyReformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

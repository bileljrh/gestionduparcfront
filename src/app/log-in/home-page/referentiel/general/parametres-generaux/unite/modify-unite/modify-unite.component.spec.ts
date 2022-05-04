import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyUniteComponent} from './modify-unite.component';

describe('ModifyUniteComponent', () => {
  let component: ModifyUniteComponent;
  let fixture: ComponentFixture<ModifyUniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyUniteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyUniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

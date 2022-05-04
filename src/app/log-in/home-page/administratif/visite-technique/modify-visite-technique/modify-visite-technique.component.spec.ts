import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModifyVisiteTechniqueComponent} from './modify-visite-technique.component';

describe('ModifyVisiteTechniqueComponent', () => {
  let component: ModifyVisiteTechniqueComponent;
  let fixture: ComponentFixture<ModifyVisiteTechniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifyVisiteTechniqueComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyVisiteTechniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

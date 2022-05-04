import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NouveauOrdreMissionComponent} from './nouveau-ordre-mission.component';

describe('NouveauOrdreMissionComponent', () => {
  let component: NouveauOrdreMissionComponent;
  let fixture: ComponentFixture<NouveauOrdreMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouveauOrdreMissionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauOrdreMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

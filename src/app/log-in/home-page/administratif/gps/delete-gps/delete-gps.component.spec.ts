import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteGPSComponent} from './delete-gps.component';

describe('DeleteGPSComponent', () => {
  let component: DeleteGPSComponent;
  let fixture: ComponentFixture<DeleteGPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteGPSComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteGPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

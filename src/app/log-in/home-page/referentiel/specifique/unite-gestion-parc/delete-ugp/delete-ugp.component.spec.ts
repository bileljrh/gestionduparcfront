import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteUGPComponent} from './delete-ugp.component';

describe('DeleteUGPComponent', () => {
  let component: DeleteUGPComponent;
  let fixture: ComponentFixture<DeleteUGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteUGPComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

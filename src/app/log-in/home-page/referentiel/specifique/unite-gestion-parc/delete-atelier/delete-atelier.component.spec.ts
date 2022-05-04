import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteAtelierComponent} from './delete-atelier.component';

describe('DeleteAtelierComponent', () => {
  let component: DeleteAtelierComponent;
  let fixture: ComponentFixture<DeleteAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteAtelierComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteRessourceComponent} from './delete-ressource.component';

describe('DeleteRessourceComponent', () => {
  let component: DeleteRessourceComponent;
  let fixture: ComponentFixture<DeleteRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteRessourceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

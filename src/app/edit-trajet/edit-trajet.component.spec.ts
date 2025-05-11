import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrajetComponent } from './edit-trajet.component';

describe('EditTrajetComponent', () => {
  let component: EditTrajetComponent;
  let fixture: ComponentFixture<EditTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTrajetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

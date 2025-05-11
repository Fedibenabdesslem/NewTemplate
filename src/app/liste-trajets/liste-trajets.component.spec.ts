import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTrajetsComponent } from './liste-trajets.component';

describe('ListeTrajetsComponent', () => {
  let component: ListeTrajetsComponent;
  let fixture: ComponentFixture<ListeTrajetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeTrajetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTrajetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

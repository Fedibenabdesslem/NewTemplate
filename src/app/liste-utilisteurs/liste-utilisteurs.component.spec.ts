import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUtilisteursComponent } from './liste-utilisteurs.component';

describe('ListeUtilisteursComponent', () => {
  let component: ListeUtilisteursComponent;
  let fixture: ComponentFixture<ListeUtilisteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeUtilisteursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeUtilisteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

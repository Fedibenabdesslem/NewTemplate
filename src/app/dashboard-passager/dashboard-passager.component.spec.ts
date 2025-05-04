import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPassagerComponent } from './dashboard-passager.component';

describe('DashboardPassagerComponent', () => {
  let component: DashboardPassagerComponent;
  let fixture: ComponentFixture<DashboardPassagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPassagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPassagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

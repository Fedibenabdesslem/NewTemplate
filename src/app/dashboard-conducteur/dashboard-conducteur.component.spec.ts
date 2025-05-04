import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConducteurComponent } from './dashboard-conducteur.component';

describe('DashboardConducteurComponent', () => {
  let component: DashboardConducteurComponent;
  let fixture: ComponentFixture<DashboardConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardConducteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

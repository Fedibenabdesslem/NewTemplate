import { ComponentFixture, TestBed } from '@angular/core/testing';
import {ConducteurDashboardComponent} from './dashboard-conducteur.component';


describe('DashboardConducteurComponent', () => {
  let component: ConducteurDashboardComponent;
  let fixture: ComponentFixture<ConducteurDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConducteurDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConducteurDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

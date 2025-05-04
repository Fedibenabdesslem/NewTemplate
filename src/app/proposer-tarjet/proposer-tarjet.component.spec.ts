import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposerTarjetComponent } from './proposer-tarjet.component';

describe('ProposerTarjetComponent', () => {
  let component: ProposerTarjetComponent;
  let fixture: ComponentFixture<ProposerTarjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposerTarjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposerTarjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

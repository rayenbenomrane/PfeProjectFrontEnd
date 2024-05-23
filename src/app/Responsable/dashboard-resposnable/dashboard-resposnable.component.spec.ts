import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResposnableComponent } from './dashboard-resposnable.component';

describe('DashboardResposnableComponent', () => {
  let component: DashboardResposnableComponent;
  let fixture: ComponentFixture<DashboardResposnableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardResposnableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardResposnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

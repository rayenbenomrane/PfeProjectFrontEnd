import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesObligationsComponent } from './mes-obligations.component';

describe('MesObligationsComponent', () => {
  let component: MesObligationsComponent;
  let fixture: ComponentFixture<MesObligationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesObligationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesObligationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

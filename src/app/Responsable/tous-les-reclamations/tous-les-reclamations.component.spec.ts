import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TousLesReclamationsComponent } from './tous-les-reclamations.component';

describe('TousLesReclamationsComponent', () => {
  let component: TousLesReclamationsComponent;
  let fixture: ComponentFixture<TousLesReclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TousLesReclamationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TousLesReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

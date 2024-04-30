import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDetailImpotComponent } from './ajout-detail-impot.component';

describe('AjoutDetailImpotComponent', () => {
  let component: AjoutDetailImpotComponent;
  let fixture: ComponentFixture<AjoutDetailImpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutDetailImpotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutDetailImpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutImpotComponent } from './ajout-impot.component';

describe('AjoutImpotComponent', () => {
  let component: AjoutImpotComponent;
  let fixture: ComponentFixture<AjoutImpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutImpotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutImpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

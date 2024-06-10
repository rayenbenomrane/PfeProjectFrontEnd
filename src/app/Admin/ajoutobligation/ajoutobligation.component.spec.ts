import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutobligationComponent } from './ajoutobligation.component';

describe('AjoutobligationComponent', () => {
  let component: AjoutobligationComponent;
  let fixture: ComponentFixture<AjoutobligationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutobligationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutobligationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

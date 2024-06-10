import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutContribuableComponent } from './ajout-contribuable.component';

describe('AjoutContribuableComponent', () => {
  let component: AjoutContribuableComponent;
  let fixture: ComponentFixture<AjoutContribuableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutContribuableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutContribuableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationByContribuableComponent } from './declaration-by-contribuable.component';

describe('DeclarationByContribuableComponent', () => {
  let component: DeclarationByContribuableComponent;
  let fixture: ComponentFixture<DeclarationByContribuableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationByContribuableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeclarationByContribuableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

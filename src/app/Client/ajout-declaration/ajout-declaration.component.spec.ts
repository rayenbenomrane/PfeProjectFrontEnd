import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDeclarationComponent } from './ajout-declaration.component';

describe('AjoutDeclarationComponent', () => {
  let component: AjoutDeclarationComponent;
  let fixture: ComponentFixture<AjoutDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutDeclarationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

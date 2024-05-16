import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesDeclarationsComponent } from './mes-declarations.component';

describe('MesDeclarationsComponent', () => {
  let component: MesDeclarationsComponent;
  let fixture: ComponentFixture<MesDeclarationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesDeclarationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesDeclarationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

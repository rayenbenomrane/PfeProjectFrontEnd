import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAdminsComponent } from './table-admins.component';

describe('TableAdminsComponent', () => {
  let component: TableAdminsComponent;
  let fixture: ComponentFixture<TableAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAdminsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularFeeComponent } from './regular-fee.component';

describe('RegularFeeComponent', () => {
  let component: RegularFeeComponent;
  let fixture: ComponentFixture<RegularFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegularFeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegularFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

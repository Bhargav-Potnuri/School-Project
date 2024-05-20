import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraFeeComponent } from './extra-fee.component';

describe('ExtraFeeComponent', () => {
  let component: ExtraFeeComponent;
  let fixture: ComponentFixture<ExtraFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtraFeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtraFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

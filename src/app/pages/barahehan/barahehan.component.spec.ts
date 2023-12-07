import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarahehanComponent } from './barahehan.component';

describe('BarahehanComponent', () => {
  let component: BarahehanComponent;
  let fixture: ComponentFixture<BarahehanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarahehanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarahehanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

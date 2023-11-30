import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilipComponent } from './filip.component';

describe('FilipComponent', () => {
  let component: FilipComponent;
  let fixture: ComponentFixture<FilipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

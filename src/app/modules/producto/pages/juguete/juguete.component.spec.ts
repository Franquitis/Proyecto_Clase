import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugueteComponent } from './juguete.component';

describe('JugueteComponent', () => {
  let component: JugueteComponent;
  let fixture: ComponentFixture<JugueteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JugueteComponent]
    });
    fixture = TestBed.createComponent(JugueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

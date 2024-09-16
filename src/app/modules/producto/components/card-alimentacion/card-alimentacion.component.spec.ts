import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAlimentacionComponent } from './card-alimentacion.component';

describe('CardAlimentacionComponent', () => {
  let component: CardAlimentacionComponent;
  let fixture: ComponentFixture<CardAlimentacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAlimentacionComponent]
    });
    fixture = TestBed.createComponent(CardAlimentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

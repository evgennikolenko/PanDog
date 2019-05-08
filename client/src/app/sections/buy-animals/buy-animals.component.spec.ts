import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAnimalsComponent } from './buy-animals.component';

describe('BuyAnimalsComponent', () => {
  let component: BuyAnimalsComponent;
  let fixture: ComponentFixture<BuyAnimalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyAnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAnimalsComponent } from './filter-animals.component';

describe('FilterAnimalsComponent', () => {
  let component: FilterAnimalsComponent;
  let fixture: ComponentFixture<FilterAnimalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAnimalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAnimalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

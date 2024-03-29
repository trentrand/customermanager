import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadRequestComponent } from './bad-request.component';

describe('BadRequestComponent', () => {
  let component: BadRequestComponent;
  let fixture: ComponentFixture<BadRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadRequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

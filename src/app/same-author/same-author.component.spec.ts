import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SameAuthorComponent } from './same-author.component';

describe('SameAuthorComponent', () => {
  let component: SameAuthorComponent;
  let fixture: ComponentFixture<SameAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SameAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SameAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

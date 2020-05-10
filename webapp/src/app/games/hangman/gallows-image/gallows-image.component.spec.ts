import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GallowsImageComponent } from './gallows-image.component';

describe('GallowsImageComponent', () => {
  let component: GallowsImageComponent;
  let fixture: ComponentFixture<GallowsImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallowsImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallowsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

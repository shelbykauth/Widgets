import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesScreenComponent } from './games-screen.component';

describe('GamesScreenComponent', () => {
  let component: GamesScreenComponent;
  let fixture: ComponentFixture<GamesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

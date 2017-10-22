import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          imports: [
              RouterModule.forRoot([]),
              HttpClientModule,
              NgbCollapseModule.forRoot()
          ],
          declarations: [ HeaderComponent ],
          providers: [
            {provide: APP_BASE_HREF, useValue : '/' }
          ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

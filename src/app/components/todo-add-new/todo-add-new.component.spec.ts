import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoAddNewComponent } from './todo-add-new.component';

describe('TodoAddNewComponent', () => {
  let component: TodoAddNewComponent;
  let fixture: ComponentFixture<TodoAddNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoAddNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

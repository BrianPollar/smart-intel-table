import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IviewCell } from 'smart-intel-table';

@Component({
  selector: 'demo-button-view',
  template: `
    <button (click)="clickedEvent()">{{ renderValue }}</button>
  `,
})
export class ButtonViewComponent 
implements IviewCell, OnInit {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  clickedEvent() {
    this.save.emit(this.rowData);
  }
}

@Component({
  selector: 'basic-example-button-view',
  template: `
    <smart-intel-table [settings]="settings" [source]="data"></smart-intel-table>
  `,
})
export class BasicExampleButtonViewComponent implements OnInit {

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
      button: {
        title: 'Button',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            alert(`${row.name} saved!`)
          });
        }
      },
    },
  };

  data = [
    {
      id: 1,
      name: 'Camila Cabelo',
      username: 'Cami',
      email: 'Sincere@april.biz',
      button: 'Button #1',
    },
    {
      id: 2,
      name: 'Anne Marie',
      username: 'Ann',
      email: 'Shanna@melissa.tv',
      button: 'Button #2',
    },
    {
      id: 3,
      name: 'Billie Eilish',
      username: 'Bill',
      email: 'Nathan@yesenia.net',
      button: 'Button #3',
    },
    {
      id: 4,
      name: 'Ellie Steinfield',
      username: 'Elli',
      email: 'Julianne.OConner@kory.org',
      button: 'Button #4',
    },
    {
      id: 5,
      name: 'Justin Bieber',
      username: 'Just',
      email: 'Lucio_Hettinger@annie.ca',
      button: 'Button #5',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}

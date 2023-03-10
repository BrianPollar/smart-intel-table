import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'smart-intel-table';

@Component({
  selector: 'demo-advanced-example-server',
  template: `
    <smart-intel-table [settings]="settings" [source]="source"></smart-intel-table>
  `,
})
export class AdvancedExampleServerComponent {

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      albumId: {
        title: 'Album',
      },
      title: {
        title: 'Title',
      },
      url: {
        title: 'Url',
      },
    },
  };

  source: ServerDataSource;

  constructor(http: HttpClient) {
    this.source = new ServerDataSource(http, { endPoint: 'https://jsonplaceholder.typicode.com/photos' });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'demo-basic-example-custom-actions',
  template: `
    <smart-intel-table [settings]="settings" [source]="data" (custom)="onCustom($event)"></smart-intel-table>
  `,
})
export class BasicExampleCustomActionsComponent {

  settings = {
    actions: {
      custom: [
        {
          name: 'view',
          title: 'View ',
        },
        {
          name: 'edit',
          title: 'Edit ',
        },
        {
          name: 'delete',
          title: 'Delete ',
        },
        {
          name: 'duplicate',
          title: 'Duplicate ',
        },
      ],
    },
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
      }
    },
  };

  data = [
    {
      id: 1,
      name: 'Camila Cabelo',
      username: 'Cami',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Anne Marie',
      username: 'Ann',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Billie Eilish',
      username: 'Bill',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Ellie Steinfield',
      username: 'Elli',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Justin Bieber',
      username: 'Just',
      email: 'Lucio_Hettinger@annie.ca',
    },
  ];

  onCustom(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`)
  }
}

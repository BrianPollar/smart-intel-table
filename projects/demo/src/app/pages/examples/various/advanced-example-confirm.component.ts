import { Component } from '@angular/core';
import { LocalDataSource } from 'smart-intel-table';

@Component({
  selector: 'demo-advance-example-comfirm',
  template: `
    <smart-intel-table
      [settings]="settings"
      [source]="source"
      (deleteConfirm)="onDeleteConfirm($event)"
      (editConfirm)="onSaveConfirm($event)"
      (createConfirm)="onCreateConfirm($event)"></smart-intel-table>
  `,
})
export class AdvancedExampleConfirmComponent {
  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
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
      },
    },
  };

  data = [
    {
      id: 1,
      name: 'Camila Cabelo',
      username: 'Cami',
      email: 'Sincere@april.biz',
      notShownField: true,
    },
    {
      id: 2,
      name: 'Anne Marie',
      username: 'Ann',
      email: 'Shanna@melissa.tv',
      notShownField: true,
    },
    {
      id: 3,
      name: 'Billie Eilish',
      username: 'Bill',
      email: 'Nathan@yesenia.net',
      notShownField: false,
    },
    {
      id: 4,
      name: 'Ellie Steinfield',
      username: 'Elli',
      email: 'Julianne.OConner@kory.org',
      notShownField: false,
    },
    {
      id: 5,
      name: 'Justin Bieber',
      username: 'Just',
      email: 'Lucio_Hettinger@annie.ca',
      notShownField: false,
    },
    {
      id: 6,
      name: 'Mrs. Shy Martin',
      username: 'shy',
      email: 'Karley_Dach@jasper.info',
      notShownField: false,
    },
    {
      id: 7,
      name: 'Zack Willy',
      username: 'Zacky',
      email: 'Telly.Hoeger@billy.biz',
      notShownField: false,
    },
    {
      id: 8,
      name: 'Fik Fameica',
      username: 'Fik',
      email: 'Sherwood@rosamond.me',
      notShownField: true,
    },
    {
      id: 9,
      name: 'Lionel Richie',
      username: 'Lion',
      email: 'Chaim_McDermott@dana.io',
      notShownField: false,
    },
    {
      id: 10,
      name: 'Daphney Duhe',
      username: 'Daph',
      email: 'Rey.Padberg@karina.biz',
      notShownField: false,
    },
    {
      id: 11,
      name: 'Sam Waters',
      username: 'Sammy',
      email: 'Rey.Padberg@rosamond.biz',
      notShownField: true,
    }
  ];

  source: LocalDataSource;

  constructor() {
    this.source = new LocalDataSource(this.data);
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}

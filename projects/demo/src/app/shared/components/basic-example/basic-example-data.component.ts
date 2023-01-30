import { Component } from '@angular/core';

@Component({
  selector: 'demo-basic-example-data',
  template: `
    <smart-intel-table [settings]="settings" [source]="data"></smart-intel-table>
  `,
})
export class BasicExampleDataComponent {
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
    {
      id: 6,
      name: 'Mrs. Shy Martin',
      username: 'shy',
      email: 'Karley_Dach@jasper.info',
    },
    {
      id: 7,
      name: 'Zack Willy',
      username: 'Zacky',
      email: 'Telly.Hoeger@billy.biz',
    },
    {
      id: 8,
      name: 'Fik Fameica',
      username: 'Fik',
      email: 'Sherwood@rosamond.me',
    },
    {
      id: 9,
      name: 'Lionel Richie',
      username: 'Lion',
      email: 'Chaim_McDermott@dana.io',
    },
    {
      id: 10,
      name: 'Daphney Duhe',
      username: 'Daph',
      email: 'Rey.Padberg@karina.biz',
    },
    {
      id: 11,
      name: 'Sam Waters',
      username: 'Sammy',
      email: 'Rey.Padberg@rosamond.biz',
    },
  ];
}

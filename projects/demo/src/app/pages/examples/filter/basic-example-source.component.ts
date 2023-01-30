import { Component } from '@angular/core';
import { LocalDataSource } from 'smart-intel-table';

@Component({
  selector: 'demo-basic-example-source',
  template: `
    <input #search class="search" type="text" placeholder="Search..." (keydown.enter)="onSearch(search.value)">
    <smart-intel-table [settings]="settings" [source]="source"></smart-intel-table>
  `,
})
export class BasicExampleSourceComponent {

  settings = {
    columns: {
      id: {
        title: 'ID',
        filter: false,
      },
      name: {
        title: 'Full Name',
        filter: false,
      },
      username: {
        title: 'User Name',
        filter: false,
      },
      email: {
        title: 'Email',
        filter: false,
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

  source: LocalDataSource;

  constructor() {
    this.source = new LocalDataSource(this.data);
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to inclue in the search
      {
        field: 'id',
        search: query,
      },
      {
        field: 'name',
        search: query,
      },
      {
        field: 'username',
        search: query,
      },
      {
        field: 'email',
        search: query,
      },
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }
}

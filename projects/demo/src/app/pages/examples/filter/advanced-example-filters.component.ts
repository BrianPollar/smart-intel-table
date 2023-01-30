import { Component } from '@angular/core';

@Component({
  selector: 'advanced-example-filters',
  template: `
    <smart-intel-table [settings]="settings" [source]="data"></smart-intel-table>
  `,
})
export class AdvancedExampleFiltersComponent {

  data = [
    {
      id: 4,
      name: 'Ellie Steinfield',
      email: 'Julianne.OConner@kory.org',
      passed: 'Yes',
    },
    {
      id: 5,
      name: 'Justin Bieber',
      email: 'Lucio_Hettinger@annie.ca',
      passed: 'No',
    },
    {
      id: 6,
      name: 'Mrs. Shy Martin',
      email: 'Karley_Dach@jasper.info',
      passed: 'Yes',
    },
    {
      id: 7,
      name: 'Zack Willy',
      email: 'Telly.Hoeger@billy.biz',
      passed: 'No',
    },
    {
      id: 8,
      name: 'Fik Fameica',
      email: 'Sherwood@rosamond.me',
      passed: 'Yes',
    },
    {
      id: 9,
      name: 'Lionel Richie',
      email: 'Chaim_McDermott@dana.io',
      passed: 'No',
    },
    {
      id: 10,
      name: 'Daphney Duhe',
      email: 'Rey.Padberg@karina.biz',
      passed: 'No',
    },
    {
      id: 11,
      name: 'Sam Waters',
      email: 'Rey.Padberg@rosamond.biz',
      passed: 'Yes',
    },
  ];

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: 'Lionel Richie', title: 'Lionel Richie' },
              { value: 'Zack Willy', title: 'Zack Willy' },
              { value: 'Justin Bieber', title: 'Justin Bieber' },
            ],
          },
        },
      },
      email: {
        title: 'Email',
        filter: {
          type: 'completer',
          config: {
            completer: {
              data: this.data,
              searchFields: 'email',
              titleField: 'email',
            },
          },
        },
      },
      passed: {
        title: 'Passed',
        filter: {
          type: 'checkbox',
          config: {
            true: 'Yes',
            false: 'No',
            resetText: 'clear',
          },
        },
      },
    },
  };
}

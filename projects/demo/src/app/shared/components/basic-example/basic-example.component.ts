import { Component } from '@angular/core';

@Component({
  selector: 'demo-basic-example',
  template: `
    <smart-intel-table [settings]="settings"></smart-intel-table>
  `,
})
export class BasicExampleComponent {
  settings = {
    columns: {
      id: {
        title: 'ID',
        width: '100px',
      },
      name: {
        title: 'Full Name',
        width: '40%',
      },
      username: {
        title: 'User Name',
      },
      email: {
        title: 'Email',
      },
    },
  };

}

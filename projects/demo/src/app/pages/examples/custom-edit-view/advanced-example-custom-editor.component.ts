import { Component } from '@angular/core';

import { CustomEditorComponent } from './custom-editor.component';
import { CustomRenderComponent } from './custom-render.component';
import { CustomFilterComponent } from './custom-filter.component';

@Component({
  selector: 'advanced-example-custom-editor',
  template: `
    <smart-intel-table [settings]="settings" [source]="data"></smart-intel-table>
  `,
})
export class AdvancedExamplesCustomEditorComponent {

  data = [
    {
      id: 1,
      name: 'Camila Cabelo',
      username: 'Cami',
      link: '<a href="http://www.google.com">Google</a>',
    },
    {
      id: 2,
      name: 'Anne Marrie',
      username: 'Ann',
      link: '<a href="https://github.com/akveo/ng2-admin">Ng2 Admin</a>',
    },
    {
      id: 3,
      name: 'Billie Eilish',
      username: 'Billy',
      link: '<a href="https://github.com/akveo/smart-intel-table">Ng2 smart table</a>',
    },
    {
      id: 4,
      name: 'Ellie Steinfield',
      username: 'Elli',
      link: '<a href="https://github.com/akveo/blur-admin">Blur Admin</a>',
    },
  ];

  settings = {
    columns: {
      id: {
        title: 'ID',
        filter: {
          type: 'custom',
          component: CustomFilterComponent
        }
      },
      name: {
        title: 'Full Name',
        type: 'custom',
        renderComponent: CustomRenderComponent,
      },
      username: {
        title: 'User Name',
      },
      link: {
        title: 'Link',
        type: 'html',
        editor: {
          type: 'custom',
          component: CustomEditorComponent,
        },
      },
    },
  };
}

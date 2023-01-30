import { Component } from '@angular/core';

@Component({
  selector: 'demo-advanced-example-types',
  template: `
    <smart-intel-table [settings]="settings" [source]="data"></smart-intel-table>
  `,
})
export class AdvancedExamplesTypesComponent {

  data = [
    {
      id: 1,
      name: 'Camila Cabelo',
      username: 'Cami',
      email: 'Sincere@april.biz',
      comments: 'Lorem ipsum dolor sit amet, ex dolorem officiis convenire usu.',
      passed: 'Yes',
    },
    {
      id: 2,
      name: 'Anne Marie',
      username: 'Ann',
      email: 'Shanna@melissa.tv',
      comments: `Vix iudico graecis in? Malis eirmod consectetuer duo ut?
                Mel an aeterno vivendum accusata, qui ne amet stet definitiones.`,
      passed: 'Yes',
    },
    {
      id: 3,
      name: 'Billie Eilish',
      username: 'Bill',
      email: 'Nathan@yesenia.net',
      comments: 'Mollis latine intellegebat ei usu, veri exerci intellegebat vel cu. Eu nec ferri copiosae.',
      passed: 'No',
    },
    {
      id: 4,
      name: 'Ellie Steinfield',
      username: 'Elli',
      email: 'Julianne.OConner@kory.org',
      comments: 'Eu sea graece corrumpit, et tation nominavi philosophia eam, veri posidonium ex mea?',
      passed: 'Yes',
    },
    {
      id: 5,
      name: 'Justin Bieber',
      username: 'Just',
      email: 'Lucio_Hettinger@annie.ca',
      comments: `Quo viris appellantur an, pro id eirmod oblique iuvaret,
                timeam omittam comprehensam ad eam? Eos id dico gubergren,
                cum dicant qualisque ea, id vim ferri moderatius?`,
      passed: 'No',
    },
    {
      id: 6,
      name: 'Mrs. Shy Martin',
      username: 'shy',
      email: 'Karley_Dach@jasper.info',
      comments: 'Audire appareat sententiae qui no. Sed no rebum vitae quidam.',
      passed: 'No',
    },
    {
      id: 7,
      name: 'Zack Willy',
      username: 'Zacky',
      email: 'Telly.Hoeger@billy.biz',
      comments: `Mel dicat sanctus accusata ut! Eu sit choro vituperata,
                qui cu quod gubergren elaboraret, mollis vulputate ex cum!`,
      passed: 'Yes',
    },
    {
      id: 8,
      name: 'Fik Fameica',
      username: 'Fik',
      email: 'Sherwood@rosamond.me',
      comments: 'Cu usu nostrum quaerendum, no eripuit sanctus democritum cum.',
      passed: 'No',
    },
    {
      id: 9,
      name: 'Lionel Richie',
      username: 'Lion',
      email: 'Chaim_McDermott@dana.io',
      comments: 'In iisque oporteat vix, amet volutpat constituto sit ut. Habeo suavitate vis ei.',
      passed: 'No',
    },
    {
      id: 10,
      name: 'Daphney Duhe',
      username: 'Daph',
      email: 'Rey.Padberg@karina.biz',
      comments: `Lorem ipsum dolor sit amet, causae fuisset ea has, adhuc tantas interesset per id.
                Ne vocibus persequeris has, meis lucilius ex mea, illum labores contentiones pro in?`,
      passed: 'Yes',
    },
    {
      id: 11,
      name: 'Sam Waters',
      username: 'Sammy',
      email: 'Rey.Padberg@rosamond.biz',
      comments: 'Lorem ipsum dolor sit amet, mea dolorum detraxit ea?',
      passed: 'No',
    },
  ];

  settings = {
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: this.data,
              searchFields: 'name',
              titleField: 'name',
              descriptionField: 'email',
            },
          },
        },
      },
      username: {
        title: 'User Name',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Ann', title: 'Ann' }, { value: 'Cami', title: 'Cami' }, {
              value: '<b>Bill</b>',
              title: 'Bill',
            }],
          },
        },
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      comments: {
        title: 'Comments',
        editor: {
          type: 'textarea',
        },
      },
      passed: {
        title: 'Passed',
        editor: {
          type: 'checkbox',
          config: {
            true: 'Yes',
            false: 'No',
          },
        },
      },
    },
  };
}

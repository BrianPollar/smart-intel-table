import { Component } from '@angular/core';

@Component({
selector: 'basic-example-data',
styles: [],
template: `  <smart-intel-table [settings]="settings" [source]="data"></smart-intel-table>`
})
export class BasicExampleDataComponent {

settings = {
columns: {
id: {
title: 'ID'
},
name: {
title: 'Full Name'
},
username: {
title: 'User Name'
},
email: {
title: 'Email'
}
}
};

data = [
{
id: 1,
name: "Camila Cabelo",
username: "Cami",
email: "Sincere@april.biz"
},
// ... other rows here
{
id: 11,
name: "Sam Waters",
username: "Sammy",
email: "Rey.Padberg@rosamond.biz"
}
];
}

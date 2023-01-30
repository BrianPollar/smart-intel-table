// ...

@Component({
template: `    <input #search class="search" type="text" placeholder="Search..." (keydown.enter)="onSearch(search.value)">
    <smart-intel-table [settings]="settings" [source]="source"></smart-intel-table>
 `
})
// ...

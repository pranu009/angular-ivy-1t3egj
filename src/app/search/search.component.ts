import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchText = '';
  errorMessage: any;
  users: any;

  constructor(private readonly http: HttpClient) {
    this.searchText = '';
  }

  test(): void {
    this.users = this.http
      .get(`https://api.github.com/search/users?q=${this.searchText}`)
      .pipe(map((res: any) => {
        let entry = {
          searchText: this.searchText,
          attempt: res.items.length > 0 ? 'successful' : 'unsuccessful',
          result: res.items
        }
        const searchHistory = localStorage.getItem('searchHistory') || '[]';
        let data = JSON.parse(searchHistory);
        data.push(entry);

        localStorage.setItem('searchHistory', JSON.stringify(data));
        if (res.items.length == 0) {
          this.errorMessage = "No result Found!";
        }
        return res.items
      }));
  }
}

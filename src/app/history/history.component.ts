import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  searchHistory: any;
  constructor() {
    const data = localStorage.getItem('searchHistory') || '[]';
    this.searchHistory = JSON.parse(data);
  }

  ngOnInit(): void {
  }
  test() {
    localStorage.removeItem('searchHistory');
    window.location.reload();
  }

}

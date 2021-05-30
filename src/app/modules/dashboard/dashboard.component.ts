import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  name: string = '';

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  }

}

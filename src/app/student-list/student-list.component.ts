import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

export interface StudentData {
  change: string;
  description: string;
  education: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'email', 'education', 'action'];
  dataSource: MatTableDataSource<StudentData>;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private localStorageService: LocalStorageService, private router: Router) {
    this.getStudentsData();
  }

  ngOnInit() {
  }

  getStudentsData() {
    let data = JSON.parse(this.localStorageService.getStudentsData());
    this.dataSource = new MatTableDataSource(data);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editStudent(index: number) {
    this.router.navigate(['student', index]);
  }

  removeStudent(index: number) {
    const removeRes = this.localStorageService.removeStudentsData(index);
    if (removeRes) {
      this.getStudentsData();
    }
  }
}

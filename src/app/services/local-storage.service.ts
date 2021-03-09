import { Injectable } from '@angular/core';
import { student } from './../interface/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  studentsData: any = [];
  constructor() { }

  setUerStudentdata(studentData, studentId?: number) {
    if(localStorage.getItem('studentsdata')) {
      this.studentsData = JSON.parse(localStorage.getItem('studentsdata'));
      if (studentId) {
        this.studentsData[studentId] = studentData;
      } else {
        this.studentsData.push(studentData)
      }
    } else {
      this.studentsData.push(studentData);
    }
    localStorage.setItem('studentsdata', JSON.stringify(this.studentsData));
    return true;
  }

  getStudentsData() {
   let data = localStorage.getItem('studentsdata');
   return data;
  }

  getStudentData(id) {
    let data = JSON.parse(localStorage.getItem('studentsdata'));
    console.log(data);
    return data[id];
  }

  removeStudentsData(index: number) {
    let data = JSON.parse(localStorage.getItem('studentsdata'));
    data.splice(index, 1);
    localStorage.setItem('studentsdata', JSON.stringify(data));
    return true;
  }
}

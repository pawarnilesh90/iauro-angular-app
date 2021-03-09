import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentForm: FormGroup;
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  isEdit = false;
  editFormData: any;
  studentId: number;
  
  constructor( private formBuilder: FormBuilder, private localStorageService: LocalStorageService,
    private router: Router, private route: ActivatedRoute) { 
      if (this.route.snapshot.params['id']) {
        this.isEdit = true;
        this.studentId = this.route.snapshot.params['id'];
        this.editFormData = this.localStorageService.getStudentData(this.route.snapshot.params['id']);
      }
    }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(this.emailRegx)]],
      change: [null],
      education: [null],
      description: [null]
    });
    if (this.isEdit) {
      this.studentForm.patchValue(this.editFormData);
    }
  }

  submit() {
    let res;
    if (!this.studentForm.valid) {
      return;
    }
    if (this.isEdit) {
      res = this.localStorageService.setUerStudentdata(this.studentForm.value, this.studentId);
    } else {
      res = this.localStorageService.setUerStudentdata(this.studentForm.value);
    }
    if (res) {
      this.router.navigate(['student-list']);
    }
  }

}

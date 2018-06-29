import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  modalForm: FormGroup;
  constructor(public fb: FormBuilder) {
    this.modalForm = fb.group({
      modalFormNameEx: ['', Validators.required],
      modalFormEmailEx: ['', [Validators.email, Validators.required]],
      modalFormSubjectEx: ['', Validators.required],
      modalFormTextEx: ['', Validators.required]
    });

   }

  ngOnInit() {
  }

}

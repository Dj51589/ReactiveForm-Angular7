import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})

export class FormComponentComponent implements OnInit {
  personForm: FormGroup;
  degrees = ['Baord', 'Graduate', 'Post Graduate', 'Doctor', 'PhD'];
  selectedHobbies: [string];
  myhobbies: any = [
    {
      name: 'Sports',
      value: 'sports'
    },
    {
      name: 'Music',
      value: 'music'
    },
    {
      name: 'Movie',
      value: 'movie'
    },
    {
      name: 'Reading',
      value: 'reading'
    },
    {
      name: 'Writing',
      value: 'writing'
    }
  ];
  formSubmitted: boolean;
  showOutput: boolean;
  person: {
    firstName: 'Dheeraj',
    lstName: 'Jaiswal'
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createFormInputs();
    this.setFormInputs();
  }

  createFormInputs = () => {
    this.personForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      maritalStatus: [null],
      qualification: [null],
      contactNumber: [
        null,
        [Validators.required, Validators.pattern('[0-9]*')]
      ],
      emailId: [
        null,
        [Validators.required, Validators.email]
      ],
      dob: [null],
      hobbies: this.buildHobbies(this.myhobbies),
      address: this.fb.group({
        street: [null],
        city: [null],
        country: [null],
        zipcode: [null]
      }),
      description: [null]
    });
  }

  buildHobbies = (hobbiesInputs) => {
    const arr = hobbiesInputs.map(hobby => {
      return this.fb.control(hobby.selected || false);
    });
    return this.fb.array(arr);
  }

  onHobbyChange = () => {
    this.selectedHobbies = _.map(this.personForm.controls.hobbies['controls'], (hobby, i) => {
      return hobby.value && this.myhobbies[i].value;
    });
    this.selectedHobbies = _.filter(this.selectedHobbies, function(hobby) {
      if (hobby !== false) {
        return hobby;
      }
    });
  }

  setFormInputs = () => {
    const myhobbies: any = [
      {
        name: 'Sports',
        value: 'sports'
      },
      {
        name: 'Music',
        value: 'music',
        selected: true
      },
      {
        name: 'Movie',
        value: 'movie',
        selected: true
      },
      {
        name: 'Reading',
        value: 'reading'
      },
      {
        name: 'Writing',
        value: 'writing'
      }
    ];
    this.personForm.controls.hobbies = this.buildHobbies(myhobbies);
    this.onHobbyChange();
  }

  validateForm = () => {
    debugger;
    this.formSubmitted = true;
    this.showOutput = this.personForm.valid;
  }

  resetForm = () => {
    debugger;
    this.formSubmitted = false;
    this.showOutput = false;
    this.personForm.reset();
  }
}



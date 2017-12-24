import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {
  @Input('form') form: FormGroup
  @Input('pets') pets: FormGroup

  editIndex?: number

  constructor() { }

  ngOnInit() {
  }

  // Setup pet from and patch pet at index
  editPetAtIndex = (index: number) => {
    this.editIndex = index

    let petAtIndex = this.pets.value[index]
    this.form.patchValue(petAtIndex)
  }


}

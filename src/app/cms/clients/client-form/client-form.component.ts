import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ClientService } from '@cms/clients/client.service';
import { ClientData } from '@cms/clients/client';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnChanges, OnInit {
  params: any
  editMode: boolean

  @Input()
  client: ClientData;

  clientForm: FormGroup
  petForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editMode = this.route.snapshot.data['editMode'] || false
  }

  ngOnChanges = () => {
    this.clientForm.reset(this.client)
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.params = params
    })
    this.createForm()
    if (this.editMode) {
      // this.clientService.getClient(this.params.id).subscribe(
      //   client => {
      //     this.client = client
      //     this.ngOnChanges()
      //   },
      //   error => {
      //     console.log('An error occured: ', error)
      //   }
      // )
      this.clientForm.patchValue(this.client)
    }
    this.toggleEditFields(this.editMode)
  }

  createForm = () => {
    this.clientForm = this.fb.group({
      id: new FormControl(),
      first_name: new FormControl('', [
        Validators.required
      ]),
      last_name: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl(),
      primary_phone: new FormControl(),
      secondary_phone: new FormControl(),
      veterinarian: new FormControl(),
      comments: new FormControl(),
      pets: new FormArray([
        new FormGroup({
          name: new FormControl(),
          breed: new FormControl(),
          age: new FormControl(),
          sex: new FormControl(),
          bow: new FormControl(),
          bandana: new FormControl(),
          comments: new FormArray([
            new FormControl('')
          ])
        })
      ])
    })
    this.clientForm.reset()

    this.petForm = this.fb.group({
      name: new FormControl('', [
        Validators.required
      ]),
      breed: new FormControl(),
      age: new FormControl(),
      sex: new FormControl(),
      bow: new FormControl(),
      bandana: new FormControl(),
      notes: new FormControl()
    })
    this.petForm.disable()
  }

  savePet = (form: FormGroup) => {
    const newPet = Object.assign({}, form.value)
    // TODO push to .value or .controls?
    this.pets.value.push(newPet)
    this.disableAndResetForm(form)
  }

  disableAndResetForm = (form: FormArray | FormGroup, toValue?: any) => {
    form.disable()
    if (toValue && form instanceof FormArray) {
      form.patchValue(toValue)
    } else form.reset()
  }

  saveClient = (client: ClientData) => {
    return this.clientService.create(client)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
  }

  createClient = (client: ClientData) => {
    let id = this.clientService.create(client)
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      // this.router.navigate(['/client', docRef.id])
    })
  }

  onSubmit = () => {
    if (this.editMode) {
      // Edit
      this.saveClient(this.clientForm.value)
    } else {
      // Create
      this.createClient(this.clientForm.value)
    }
    this.ngOnChanges()
  }

  revert = () => {
    this.ngOnChanges()
  }

  toggleEditFields = (editMode: boolean) => {
    if (editMode) {
      // Manipulate controls that are edit mode exclusive
    } else {
      // Manipulate controls that are new mode exclusive
    }
  }

  get id() { return this.clientForm.get('id') }
  get first_name() { return this.clientForm.get('first_name') }
  get last_name() { return this.clientForm.get('last_name') }
  get address() { return this.clientForm.get('address') }
  get primary_phone() { return this.clientForm.get('primary_phone') }
  get secondary_phone() { return this.clientForm.get('secondary_phone') }
  get veterinarian() { return this.clientForm.get('veterinarian') }
  get comments() { return this.clientForm.get('comments') }
  get pets() { return this.clientForm.get('pets') as FormArray }
}

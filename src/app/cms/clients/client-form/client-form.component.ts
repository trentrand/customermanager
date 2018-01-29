import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ClientService } from '@cms/clients/client.service';
import { ClientData } from '@cms/clients/client';
import { IAlert } from '@core/ialert';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnChanges, OnInit {
  params: any
  queryParams: any

  editMode: boolean
  editIndex?: number

  @Input()
  client: ClientData;

  clientForm: FormGroup
  petForm: FormGroup

  devPreviewCollapsed: boolean = true
  alerts: Array<IAlert> = [];

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
      this.params = params;
    })
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.queryParams = queryParams;
    })
    this.createClientForm()
    this.createPetForm()
    if (this.editMode) {
      this.clientService.getClient(this.params.id).subscribe(
        client => {
          this.client = client
          this.clientForm.patchValue(this.client)
          this.patchPets(this.client.pets)
          this.ngOnChanges()
        },
        error => {
          console.log('An error occured: ', error)
        }
      )
    }
    // Alert that new client was created successfully!
    if (this.queryParams['newClient']) {
      this.alerts.push({
        type: 'success',
        message: 'New client was successfully created',
      })
    }
    this.toggleEditFields(this.editMode)
  }

  // Setup client form
  createClientForm = () => {
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
      pets: new FormArray([])
    })
  }

  // Save changes to currently-edited Client Record
  saveClient = (client: ClientData) => {
    return this.clientService.updateClient(client)
      .then((docRef) => {
        console.log("Client Document updated", docRef);
        this.alerts.push({
          type: 'success',
          message: 'Updates were successfully saved to this client',
        })
      })
  }

  // Create new Client document
  createClient = (client: ClientData) => {
    let id = this.clientService.create(client)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id);
        this.router.navigate(
          ['/client', docRef.id], { queryParams: { newClient: true } }
        )
      })
  }

  // Delete currently-edited Client document
  deleteClient = (client: ClientData) => {
    if (!this.editMode) return
    if (confirm(`Are you sure you want to delete this client?`)) {
      this.clientService.deleteClient(client)
        .then(() => {
          console.log("Client Document deleted");
          this.router.navigate(
            ['/clients'], { queryParams: { deletedClient: true } }
          )
        })
    }
  }

  // Toggle "pin" field and save client
  togglePin = () => {
    this.client.pinned = !this.client.pinned
    return this.clientService.updateClient(this.client)
      .then((docRef) => {
        console.log("Document updated", docRef);
      })
  }

  // Setup pet form
  createPetForm = () => {
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
    this.editIndex = -1
  }

  // Setup pet form and patch pet at index
  editPetAtIndex = (index: number) => {
    this.editIndex = index
    let petAtIndex = this.pets.value[index]
    this.petForm.patchValue(petAtIndex)
    this.petForm.enable()
  }

  // Remove pet at index and close form
  deletePetAtIndex = (index: number) => {
    this.editIndex = undefined
    this.pets.removeAt(index)
    if (this.editMode) {
      this.saveClient(this.clientForm.value)
    }
    this.disableAndResetForm(this.petForm)
  }

  // Patch Pets FormArray with pets data
  patchPets = (pets: any[]) => {
    let formArray = <FormArray>this.pets;
    this.clearFormArray(formArray)
    pets.forEach(pet => {
      formArray.push(this.fb.group({
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        sex: pet.sex,
        bow: pet.bow,
        bandana: pet.bandana,
        notes: pet.notes
      }))
    })
  }

  // Append new pet
  // If edit mode, automatically save the Client Record
  createPet = (form: FormGroup) => {
    const newPet = form.value
    if (this.editIndex < 0) {
      this.pets.value.push(newPet)
    } else {
      this.pets.value[this.editIndex] = newPet
    }
    if (this.editMode) {
      this.saveClient(this.clientForm.value)
    }
    this.disableAndResetForm(form)
  }

  /* Form Helpers */
  disableAndResetForm = (form: FormArray | FormGroup, toValue?: any) => {
    form.disable()
    this.editIndex = undefined
    if (toValue && form instanceof FormArray) {
      form.patchValue(toValue)
    } else form.reset()
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
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
    this.petForm.disable()

    if (editMode) {
      // edit-only modifications
    } else {
      // new-only modifications
    }
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  /* Client Form interface */
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

import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  
  people: Person[];
  selectedPerson: Person;
  creating = false;
  newPerson: Person;
  
  getPeople(): void {
    this.personService.getPeople()
      .then((res) => {
        this.people = res;
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  onCreate() {
    this.creating = !this.creating;
    if (this.creating) {
      this.newPerson = new Person({personID: 0, firstname: "Joel", lastname: "Weng",
                                   position: "Starboard", gradYear: 2017});
    }
  }
  
  onSubmit() {
    this.personService.createPerson(this.newPerson)
      .then((res) => {
        this.creating = false;
        this.getPeople();
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  onSelect(person: Person) {
    if (this.selectedPerson == person) {
      this.selectedPerson = null;
    } else {
      this.selectedPerson = person;
    }
  }

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPeople();
  }

}

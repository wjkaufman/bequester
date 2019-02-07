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
  
  getPeople(): void {
    this.personService.getPeople()
      .then((res) => {
        this.people = res;
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  onSelect(person: Person) {
    this.selectedPerson = person
  }

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.getPeople();
  }

}

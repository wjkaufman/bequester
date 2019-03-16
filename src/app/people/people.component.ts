import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';
import { ActivatedRoute } from '@angular/router';


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
  deleting = false;
  
  getPeople(): Promise<void> {
    return this.personService.getPeople()
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
    this.selectedPerson = person;
  }
  
  onDelete(person: Person) {
    person.isDeleted = true;
    this.personService.updatePerson(person)
      .then(res => {
        this.deleting = false;
        this.getPeople();
      })
      .catch(err => {
        console.error(err);
      })
  }
  
  onSearch(searchQuery: string) {
    if (searchQuery == '') {
      this.getPeople();
    } else {
      this.personService.getPeopleByString(searchQuery)
        .then(res => {
          this.people = res;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  constructor(private personService: PersonService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPeople()
      .then((res) => {
        this.route.params.subscribe(params => {
          // check if any parameters were passed
          if (params['personID']) {
            for (let p of this.people) {
              if (p.personID == +params['personID']) {
                this.selectedPerson = p;
                break;
              }
            }
          }
        });
      })
      .catch(err => {
        console.error(err);
      })
  }

}

import { Injectable } from '@angular/core';
import { Person } from './person';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  
  private ipc: IpcRenderer;
  
  async getPeople() {
    return new Promise<Person[]>((resolve, reject) => {
      this.ipc.once('getPeopleResponse', (event, arg) => {
        let people: Person[] = [];
        for (let p of arg) {
          people.push(new Person(p));
        }
        resolve(people);
      });
      this.ipc.send('getPeople');
    });
  }
  
  async updatePerson(p: Person) {
    return new Promise<Person>((resolve, reject) => {
      this.ipc.once('updatePersonResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('updatePerson', p);
    })
  }

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }
}

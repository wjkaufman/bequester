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
        resolve(arg);
      });
      this.ipc.send('getPeople');
    });
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

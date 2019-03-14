import { Injectable } from '@angular/core';
import { Bequest } from './bequest';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class BequestService {
  
  private ipc: IpcRenderer;
  
  async getBequests() {
    return new Promise<Bequest[]>((resolve, reject) => {
      this.ipc.once('getBequestsResponse', (event, arg) => {
        let bequests: Bequest[] = [];
        for (let b of arg) {
          bequests.push(new Bequest(b));
        }
        resolve(bequests);
      });
      this.ipc.send('getBequests');
    });
  }
  
  async getBequestsByString(query: string) {
    return new Promise<Bequest[]>((resolve, reject) => {
      this.ipc.once('getBequestsByStringResponse', (event, arg) => {
        let bequests: Bequest[] = [];
        for (let b of arg) {
          bequests.push(new Bequest(b));
        }
        resolve(bequests);
      });
      this.ipc.send('getBequestsByString', query);
    });
  }
  
  async updateBequest(bequest: Bequest) {
    return new Promise<Bequest[]>((resolve, reject) => {
      this.ipc.once('updateBequestResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('updateBequest', bequest);
    });
  }
  
  async createBequest(bequest: Bequest) {
    return new Promise((resolve, reject) => {
      this.ipc.once('createBequestResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('createBequest', bequest);
    })
  }
  
  async deleteBequest(bequest: Bequest) {
    return new Promise((resolve, reject) => {
      this.ipc.once('deleteBequestResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('deleteBequest', bequest);
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

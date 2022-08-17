import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(private storage: Storage) { }

  private terminalStorage: Storage | null = null;

  async init(){
    const storage = await this.storage.create();
    this.terminalStorage = storage;
  }

  public async setTerminal( value: any){
    if(!this.terminalStorage ) {
      await this.init();
    }
    await this.terminalStorage?.set('Terminal', value);
  }

  public async getTerminal(){
    if(!this.terminalStorage ) {
      await this.init();
    }
    let terminal = {};
    await this.terminalStorage?.get('Terminal').then(e => terminal = e);
    return terminal as string;
  }

  public async removeTerminal(){
    if(!this.terminalStorage ) {
      await this.init();
    }
    await this.terminalStorage?.remove('Terminal');
  }
}

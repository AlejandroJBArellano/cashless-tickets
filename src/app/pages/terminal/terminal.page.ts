import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TerminalService } from 'src/app/services/terminal.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.page.html',
  styleUrls: ['./terminal.page.scss'],
})
export class TerminalPage implements OnInit {
  public terminal = ""
  constructor(private terminalService: TerminalService,
    private router: Router) { }

  ngOnInit() {
  }

  async createTerminal(){
    await this.terminalService.setTerminal(this.terminal)
    this.router.navigateByUrl('/login')
  }

}

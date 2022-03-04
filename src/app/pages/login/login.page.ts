import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  pin: string;

  constructor(private auth: AuthService,
    private router: Router) {
    this.pin = '';
  }

  ngOnInit() {
  }
  addNumber(cuantity){
    this.pin += cuantity;
  }
  enter(){
    if(this.pin.length !== 4){
      alert('los pines tienen 4 dígitos');
      return;
    }
    this.auth.findUser(this.pin).subscribe(
      async res => {
        await this.auth.setUser(res);
        this.router.navigateByUrl('/menu');
      }
    );
  }
  deleteNumber(){
    this.pin = this.pin.slice(0, -1);
  }
}

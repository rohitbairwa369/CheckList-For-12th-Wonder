import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthGuard } from './auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  Heading:string="Login"
  constructor(private router: Router, private messageService :MessageService, private auth:AuthGuard) { }
  ngOnInit(): void {
    const retrievedUserData = localStorage.getItem('users');
    if(retrievedUserData != null){
      this.users =JSON.parse(retrievedUserData);
    }else{
      localStorage.setItem('users',JSON.stringify(this.users));
    }
  }

  users:any[]=[{
    email:'rohittbairwaa11@gmail.com',
    password: '1234567'
  }
]

onSubmit(form:NgForm)
{
  const email = form.value.email;
  const password = form.value.password;
  const repassword = form.value.repassword;

  console.log(form.value);
  const retrievedUserData = localStorage.getItem('users');
  this.users =JSON.parse(retrievedUserData);
  const user = this.users.find(u => u.email == email && u.password == password);
  if (user) {
    this.auth.haveloggedin=true;
    localStorage.setItem('loginStatus','true');
    this.router.navigate(['/home']);
  } else {
    this.showError();
  }
}
showLoginForm:boolean=true;

toggleLoginSignup(){
  this.showLoginForm=!this.showLoginForm;
  if(this.showLoginForm!=true){
  this.Heading= "Sign Up";
  }else{
    this.Heading="Login";
  }
}

onCreateAccount(form:NgForm){
  const email = form.value.email;
  const password = form.value.password;

  const user = {
    email: email,
    password: password
  };
 this.users.push(user);
 localStorage.setItem('users',JSON.stringify(this.users));
 this.messageService.add({ severity: 'success', summary: 'User Register', detail: 'Added' });
 this.toggleLoginSignup();
}


showError() {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid User' });
}

}

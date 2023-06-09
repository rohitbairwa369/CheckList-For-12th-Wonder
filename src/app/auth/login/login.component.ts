import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthGuard } from './auth.guard';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  Heading:string="Login"
  users:any[]=[];
  constructor(private router: Router, private messageService :MessageService, private auth:AuthGuard, private taskdataService:ChecklistDataService) { }
  ngOnInit(): void {
    this.taskdataService.getUserData().subscribe((res)=>{
      this.users = res;
    })
  }


onSubmit(form:NgForm)
{
  const email = form.value.email;
  const password = form.value.password;
  const repassword = form.value.repassword;


  const user = this.users.find(u => u.email == email && u.password == password);
  if (user) {
    localStorage.setItem("UserId",user.id);
    this.auth.haveloggedin=true;
    localStorage.setItem('loginStatus','true');
    this.messageService.add({ severity: 'success', summary: 'Login Success', detail: 'Successfull' });
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
  const name = form.value.username;
  
  const used = this.users.find(u => u.email == email);
  if(!used){
    const user = {
      name : name,
      email: email,
      password: password
    };
    this.users.push(user);
    this.taskdataService.registerUser(user).subscribe((res)=>{
    console.log("Data Pushed" , res);
  })
  this.toggleLoginSignup();
  this.messageService.add({ severity: 'success', summary: 'User Register', detail: 'Added' });
  }
  else{
    this.messageService.add({severity:'error', summary: 'Sign Up Issue', detail: 'Email Already Exist'});
  }
}


showError() {
  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid User' });
}

}

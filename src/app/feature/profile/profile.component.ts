import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChecklistDataService } from 'src/app/service/checklist-data.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {

  UserImage:any;
  userData:any;
  fullname:any;
  emailId:any;
  userPassword:any;
  UpdatedImage:any;
  imageUrl: SafeResourceUrl;
  selectedFile: File;
  CurrentUserLoginId: string;

  constructor(private sanitizer: DomSanitizer, private taskdata: ChecklistDataService,private messageService: MessageService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }


  removeImage() {
    this.selectedFile = null;
    this.imageUrl = null;
  }

  OnSaveDetails(){
    const updatedUserDate={
      image:this.imageUrl,
      name:this.fullname,
      email:this.emailId,
      password:this.userPassword,
      taskdata:this.userData.taskdata
    }
  this.taskdata.updateUserData(this.CurrentUserLoginId,updatedUserDate);
  this.messageService.add({severity:'success', summary: 'Success', detail:'User Details updated'});
  }


  ngOnInit(): void {
    this.CurrentUserLoginId =localStorage.getItem("UserId");
    this.taskdata.getSpecificUserData(this.CurrentUserLoginId).subscribe((res)=>{
      this.userData = res;
      this.fullname = this.userData.name;
      this.emailId  = this.userData.email;
      this.userPassword = this.userData.password;
      this.imageUrl= this.userData.image.changingThisBreaksApplicationSecurity;
      console.log(this.userData);
    });
  }

}

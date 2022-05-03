import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGEX } from './common/constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myTask';
  arrayForm:any;
  submitted:boolean=false;
  add:boolean=false;
  addNumber:any;  
  constructor(
    private form:FormBuilder
  ){}

  ngOnInit(){
    this.arrayFormInit();
  }

  arrayFormInit(){
    this.arrayForm=this.form.group({
      name:['',[Validators.required]],
      address:['',[Validators.required]],
      phone:['',[Validators.required,Validators.pattern(REGEX.PHONE_NUMBER)]],
      password:['',[Validators.required,Validators.pattern(REGEX.PASSWORD)]],
      email:['',[Validators.required,Validators.pattern(REGEX.EMAIL)]],
      emergencyContact:this.form.array([])
    })
  }

  get controls(){
    return this.arrayForm.controls;
  }
 
  get contacts():FormArray{
    return this.arrayForm.get('emergencyContact') as FormArray;
  }
   
  newContact():FormGroup{
    return this.form.group({
      name:['',Validators.required],
      ephone:['',[Validators.required,Validators.pattern(REGEX.PHONE_NUMBER)]]
    })
  }

  addContact(){
    let add=this.newContact();
    this.contacts.push(add);
  }

  deleteContact(index:number){
    this.contacts.removeAt(index);
  }

  submitData(){
    this.submitted=true;
    if(this.arrayForm.valid){
      console.log("Detail-->",this.arrayForm.value);
      this.arrayForm.reset();
    }
    this.submitted=false;
  }
}

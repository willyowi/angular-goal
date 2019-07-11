import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import {Goals} from '../goals'
import {GoalService} from '../goals/goal.service';
import {AlertsService} from '../alert-service/alerts.service';
import {Quote} from '../quote-class/quote';
import {HttpClient} from '@angular/common/http'
import {QuoteRequestService} from '../quote-http/quote-request.service'





@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers:[GoalService,QuoteRequestService] //add the providers to the component


})

  export class GoalComponent implements OnInit {
    goals = Goals;
    quote:Quote;
    alertService:AlertsService;
  
    toggleDetails(index){
   this.goals[index].showDescription = !this.goals[index].showDescription;
 }
 addNewGoal(goal){
  let goalLength = this.goals.length;
  goal.id = goalLength+1;
  goal.completeDate = new Date(goal.completeDate)
  this.goals.push(goal)
}

 completeGoal(isComplete, index){
  if (isComplete) {
    this.goals.splice(index,1);
  }
}
deleteGoal(isComplete,index){
  if (isComplete){

      let toDelete=confirm(` Oyah! Tupeleke na Rieng ka unadai tuchuje "${this.goals[index].name}" na  ujue tukiichuja ni ivo joh`)

      if(toDelete){
          this.goals.splice(index,1)
          this.alertService.alertMe("wazi joh ..isha Go")

      }

  }
}
constructor(goalService:GoalService,alertService:AlertsService,privatequoteService:QuoteRequestService,private http:HttpClient) {
  this.goals = goalService.getGoals();
  this.alertService = alertService;//make the service available to the class
   }




  ngOnInit() { 
    
    interface ApiResponse{
      quote:string;
      author:string
  }

  
    this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data=>{
      this.quote= new Quote(data.quote,data.author),err=>{
        this.quote= new Quote("Never, never, never give up.","winston churchill")
        console.log("Error occured ")
      }

})

  
  }
}


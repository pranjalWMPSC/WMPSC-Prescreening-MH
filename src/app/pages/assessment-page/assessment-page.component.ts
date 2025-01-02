import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy,
} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { waterPump } from '../../database/waterPump';
import { CandidateApiService } from '../../service/candidate-api.service';
import { ICandidate } from '../../models/ICandidate';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assessment-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgbModule],
  templateUrl: './assessment-page.component.html',
  styleUrl: './assessment-page.component.css',
})
export class AssessmentPageComponent {
  constructor(
    private router: Router,
    private _candidateApi: CandidateApiService,
    private _toastr: ToastrService
  ) {}

  time: number = 0;
  display: any = '0:00';
  percentage: any = 0;
  interval!: any;
  activeTab = '';
  ngbNav!: any;
  totalTime =  10;
  numberOfQuestion!: Array<number>;
  currentQuestion = 1;
  assessmentStart = false;
  todayDate = Date();
  randomQuestionIds: Array<number> = [] ;

  waterPumpQuestion = waterPump;
  selectedQuestion: Array<any> = [];
  candidateData!: ICandidate;


  ngOnInit():void{
    this.candidateData = this._candidateApi.candidateData;
    this.createQuestion();
  }

  startTimer() {
    this.numberOfQuestion = Array(15)
      .fill(15)
      .map((x, i) => i);
    this.assessmentStart = true;
    console.log('=====>');
    this.interval = setInterval(() => {
      this.time++;
      this.percentage = (this.time / this.totalTime) * 100;
      this.percentage >= 100 ? this.pauseTimer() : console.log('No Action!');
      this.display = this.transform(this.time);
    }, 1000);
  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return this.time < 10 || this.time % 60 < 10
      ? minutes + ':' + '0' + (value - minutes * 60)
      : minutes + ':' + (value - minutes * 60);
  }
  pauseTimer() {
    clearInterval(this.interval);
    this.submit();
  }

  nextQuestion(questionId: number) {
    this.currentQuestion = questionId + 1;
    let findId = this.waterPumpQuestion.find((x) => x.questionNo === questionId);
    // // findId?.answered === null ? findId?.answer === null ? this.question[questionId].answered = false : this.question[questionId].answered === true : this.question[questionId].answered === true;
    // // this.question[questionId - 1].answered = true;
    // console.log(this.selectedQuestion);
  }

  prevQuestion(questionId: number) {
    this.currentQuestion = questionId - 1;
    let findId = this.waterPumpQuestion.find((x) => x.questionNo === questionId);
    console.log(findId);
  }

  answerMarking(queId: number, answer: string, option: string) {
    let temp = this.selectedQuestion.findIndex(x=> x.questionId === queId);
    this.selectedQuestion[temp].answer = answer;
    this.selectedQuestion[temp].optionChoosen = option;
    let answerQuestion = waterPump.find(x=>x.questionNo === queId);
    if(answerQuestion?.Answer === option){
      this.selectedQuestion[temp].correctOrNot = 'Correct';
    } else {
      this.selectedQuestion[temp].correctOrNot = 'Incorrect';
    }


  }

  submit() {
    // this._apiService.addEncryption(this.question).subscribe(
    //   (response) => {
    //     console.log("Added");
    //   }, (error) => {
    //     console.log("Error");
    //   }
    // )
    // console.log(this.question);
    // this.router.navigate(['thankYou'])
    let totalMarks = this.selectedQuestion.length * 2.5;
    let correctAnswers = 0;
    let obtainedMarks = 0;
    let verdict = "Fail";
    this.selectedQuestion.forEach(element => {
      if(element.correctOrNot === 'Correct'){
        correctAnswers++
      }
    });
    obtainedMarks = correctAnswers *2.5;
    let passFailpercent = (obtainedMarks/totalMarks) *100;
    if(passFailpercent > 60){
      verdict = "Pass";
    }

    this._candidateApi.candidateData.answers = this.selectedQuestion;
    this._candidateApi.candidateData.marks = obtainedMarks;
    this._candidateApi.candidateData.result = verdict;
    this._candidateApi.candidateData.createdAt = Date();
    this._candidateApi.addCandidate(this._candidateApi.candidateData).subscribe((response) => {
      this._toastr.warning("Thank You! Your assessment has been submitted");
      this.router.navigate(['thankYou']);

    }, (error) => {
      console.log(error.error.text);
    })
  }

  createQuestion(){
    while(this.randomQuestionIds.length < 25) {
      let temp = Math.floor(Math.random() * (waterPump.length - 1 + 1) + 1);
      let res = this.randomQuestionIds.findIndex(x => x === temp);
      if(res === -1){
        this.randomQuestionIds.push(temp);
      }
    }
    console.log(this.randomQuestionIds);

    this.randomQuestionIds.forEach(element => {
      let temp = this.waterPumpQuestion.find(x => x.questionNo === element);
      let dataMap = {
        questionId: temp?.questionNo,
        question: temp?.Question,
        optionA: temp?.option_a,
        optionB: temp?.option_b,
        optionC: temp?.option_c,
        optionD: temp?.option_d,
        answer: '',
        optionChoosen: '',
        correctOrNot: ''
      }
      this.selectedQuestion.push(dataMap);
    });
    console.log(this.selectedQuestion);
  }

}
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FetchdataService } from '../_services/fetchdata.service';
import { HttpClient } from '@angular/common/http';
import { SaveDataService } from '../_services/save-data.service';

@Component({
  selector: 'app-examtopperlist',
  templateUrl: './examtopperlist.component.html',
  styleUrls: ['./examtopperlist.component.css']
})
export class ExamtopperlistComponent implements OnInit {

topperForm:FormGroup
examTitleData
topper

constructor(private frmBuilder: FormBuilder, private http: HttpClient,
  private fetchData: FetchdataService, private saveData: SaveDataService) { }

  ngOnInit() {

    this.topperForm = this.frmBuilder.group({

      examTitle: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
  
    });

    this.getExamDrop()
  }

  get examTitle() { return this.topperForm.get('examTitle'); }


  columnDefs = [

    { headerName: 'Full Name', field: 'Full_name', width: 200 },
    { headerName: 'Email', field: 'email', width: 200 },
    { headerName: 'Contact', field: 'contact', width: 200 },
    { headerName: 'Exam', field: 'title_name', width: 200 },
    { headerName: 'Percentage', field: 'percentage', width: 100 },
    { headerName: 'Rank', field: 'rank', width: 100 },
    { headerName: 'Start Time', field: 'exam_start_time', width: 150 },
    { headerName: 'End Time', field: 'exam_end_time', width: 150 },
 
  ];




  getExamDrop() {
    this.fetchData.getExamTitle().
      subscribe(
        data => {

          this.examTitleData = data.exam_title;

        },
        error => {

          console.log(error.error);
        });
  }


getTopperList(titleId)
{

  // console.log(titleId)
  // return;
  this.fetchData.getTopperList(titleId).
      subscribe(
        data => {

          this.topper = data.top_result;

        },
        error => {

          console.log(error.error);
        });
}


}

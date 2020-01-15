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

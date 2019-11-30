import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';

@Component({
  selector: 'app-examsetup',
  templateUrl: './examsetup.component.html',
  styleUrls: ['./examsetup.component.css']
})
export class ExamsetupComponent implements OnInit {
  ExamForm: FormGroup;
  isSubmitted: boolean = false;
  rowData = [];
  examTitleData = [];
  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private fetchData: FetchdataService, private saveData: SaveDataService) { }


  ngOnInit() {

    this.ExamForm = this.frmBuilder.group({

      examTitle: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      startDate: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      endDate: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

    });

    this.getExamDrop()
    this.getExam()
  }

  get examTitle() { return this.ExamForm.get('examTitle'); }
  get startDate() { return this.ExamForm.get('startDate'); }
  get endDate() { return this.ExamForm.get('endDate'); }


  save() {

    this.isSubmitted = true;
    if (!this.ExamForm.valid)
      return;

    this.saveData.postExam(this.ExamForm.value).
      subscribe(
        data => {
          alert("Data Inserted SuccessFully")
          this.ExamForm.reset()
          this.getExam()
        },
        error => {
          console.log(error);
          alert(error.error.message)
          // console.log(error);
        });
  }

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

  getExam() {
    this.fetchData.getExam().
      subscribe(
        data => {

         this.rowData = data.exam_setup;

        },
        error => {

          console.log(error.error);
        });
  }

  columnDefs = [
  
    { headerName: 'Exam Title Name', field: 'title_name', width: 200 },
    { headerName: 'Start Date Time', field: 'start_time', width: 150 },
    { headerName: 'End Date Time', field: 'end_time', width: 150 },
    { headerName: 'Active', field: 'status', width: 100 },

    {
      headerName: "Actions",

      autoHeight: true,

      template:
        `<button type="button" data-action-type="view" class="btn btn-primary" data-toggle="modal" data-target="#edit">
           Edit
         </button>
  
        <button type="button" data-action-type="remove" class="btn btn-warning">
           Delete
        </button>`
    }
  ];


  public onRowClicked(e) {
    if (e.event.target !== undefined) {
      let data = e.data;
      let actionType = e.event.target.getAttribute("data-action-type");

      switch (actionType) {
        case "view":
          return this.onActionViewClick(data);
        case "remove":
          return this.onActionRemoveClick(data);
      }
    }
  }

  public onActionViewClick(data: any) {
    // console.log("View action clicked", data);

  }

  public onActionRemoveClick(data: any) {

    if (confirm("Are you sure to Delete " + data.name)) {
      console.log("Remove action clicked", data);
    }
  }

}

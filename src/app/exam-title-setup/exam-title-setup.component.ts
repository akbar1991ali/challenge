import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';

@Component({
  selector: 'app-exam-title-setup',
  templateUrl: './exam-title-setup.component.html',
  styleUrls: ['./exam-title-setup.component.css']
})
export class ExamTitleSetupComponent implements OnInit {
  ExamTitleForm: FormGroup;
  EditExamForm:FormGroup
  isSubmitted: boolean = false;
  rowData = [];
  classData=[];
  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private fetchData: FetchdataService, private saveData: SaveDataService) { }


  ngOnInit() {

    this.ExamTitleForm = this.frmBuilder.group({

      examTitle: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      class_id: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      startDate: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      endDate: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],

    });

    this.EditExamForm = this.frmBuilder.group({
      editTitle: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      editStartTime: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      editEndTime: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      editClass: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      editId: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]

    });

    this.getExam()
    this.getClassDrop()
  }

  get examTitle() { return this.ExamTitleForm.get('examTitle'); }
  get class_id() { return this.ExamTitleForm.get('class_id'); }
  get startDate() { return this.ExamTitleForm.get('startDate'); }
  get endDate() { return this.ExamTitleForm.get('endDate'); }

  get editTitle() { return this.EditExamForm.get('editTitle'); }
  get editStartTime() { return this.EditExamForm.get('editStartTime'); }
  get editEndTime() { return this.EditExamForm.get('editEndTime'); }
  get editClass() { return this.EditExamForm.get('editClass'); }
  get editId() { return this.EditExamForm.get('editId'); }

  save() {

    this.isSubmitted = true;
    if (!this.ExamTitleForm.valid)
      return;

    this.saveData.postExamTitle(this.ExamTitleForm.value).
      subscribe(
        data => {
          alert("Data Inserted SuccessFully")
          this.ExamTitleForm.reset()
          this.getExam()
        },
        error => {
          console.log(error);
          alert(error.error.message)
          // console.log(error);
        });
  }

  getExam() {
    this.fetchData.getExamTitle().
      subscribe(
        data => {

          console.log(data);

          this.rowData = data.exam_title;


        },
        error => {

          console.log(error.error);
        });
  }

  getClassDrop() {
    this.fetchData.getClass().
      subscribe(
        data => {

         this.classData = data.class;

        },
        error => {

          console.log(error.error);
        });
  }

  deleteTitle(id) {
    this.saveData.deleteOperation(id, 'exam_title_master').
      subscribe(
        data => {
          this.getExam()

          alert("Successfully Deleted")

        },
        error => {

          console.log(error.error.message);
        });
  }

  updateExam()
  {
    this.saveData.updateExam(this.EditExamForm.value).
    subscribe(
      data => {

        
        this.getExam()
        alert("Successfully Updated")

      },
      error => {
        alert(error.error.message)
      
        console.log(error.error.message);
      });
  }



  columnDefs = [
    { headerName: 'Exam Title Id', field: 'id', width: 100 },
    { headerName: 'Exam Title Name', field: 'title_name', width: 180 },
    { headerName: 'Start Date Time', field: 'start_time', width: 180 },
    { headerName: 'End Date Time', field: 'end_time', width: 200 },
    // { headerName: 'Active', field: 'status', width: 100 },

    {
      headerName: "Actions",

      autoHeight: true,

      template:
        `<button type="button" data-action-type="edit" class="btn btn-primary" data-toggle="modal" data-target="#edit">
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
        case "edit":
          return this.onActionViewClick(data);
        case "remove":
          return this.onActionRemoveClick(data);
      }
    }
  }

  public onActionViewClick(data: any) {
    console.log("View action clicked", data);

    this.editClass.setValue(data.class_name)
    // this.editEndTime.setValue(data.end_time)
    this.editId.setValue(data.id)
    // this.editStartTime.setValue(data.start_time)
    this.editTitle.setValue(data.title_name)

  }

  public onActionRemoveClick(data: any) {

    if (confirm("Are you sure to Delete " + data.title_name)) {
      console.log("Remove action clicked", data);
      this.deleteTitle(data.id)
    }
  }

}

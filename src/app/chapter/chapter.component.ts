import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';
@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {
  chapterForm: FormGroup;
  editchapterForm: FormGroup;
  result: any = null;
  editresult: any = null;
  isSubmitted: boolean = false;
  rowData = [];
  allClass = [];
  allSubject = [];
  allMonth = [];

  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private fetchData: FetchdataService, private saveData: SaveDataService) { }

  ngOnInit() {
    this.chapterForm = this.frmBuilder.group({
      className: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      chapterName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subjectName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      monthName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]

    });

    this.getAllClass()
    this.getChapterdata()
    this.getMonth()

  }


  get className() { return this.chapterForm.get('className'); }
  get chapterName() { return this.chapterForm.get('chapterName'); }
  get subjectName() { return this.chapterForm.get('subjectName'); }
  get monthName() { return this.chapterForm.get('monthName'); }


  save() {
    this.fetchData.postChapter(this.chapterForm.value).
      subscribe(
        data => {
          console.log(data)
          this.getChapterdata();
          this.chapterForm.reset();

        },
        error => {
alert(error.error.message)
          console.log(error.error);
        });
  }

  getAllClass() {
    this.fetchData.getClass().
      subscribe(
        data => {

          // console.log(data);
          this.allClass = data.class;
        },
        error => {

          console.log(error.error);
        });
  }

  getAllSubject(classid: any) {
    console.log(classid)
    this.fetchData.getSubject(classid).
      subscribe(
        data => {

          // console.log(data);
          this.allSubject = data.subject_data;
        },
        error => {
          alert(error.error.message)
          console.log(error.error.message);
        });
  }


  getChapterdata() {

    this.fetchData.getChapter().
      subscribe(
        data => {


          this.rowData = data['chapter_data']
          console.log(data);
        },
        error => {
          // console.log(error)
          console.log(error.error);
        });
  }



  getMonth() {

    this.fetchData.getMonth().
      subscribe(
        data => {


          this.allMonth = data['month_data']
          // console.log(data);
        },
        error => {

          console.log(error.error);
        });
  }

  deleteChapter(id) {
    this.saveData.deleteOperation(id, 'chapter').
      subscribe(
        data => {
          this.getChapterdata()

          alert("Successfully Deleted")

        },
        error => {

          console.log(error.error.message);
        });
  }

  columnDefs = [
    { headerName: 'Month Name', field: 'month_name', width: 120 },
    { headerName: 'Class ', field: 'class_name', width: 100 },
    { headerName: 'Subject', field: 'subject_name', width: 100 },
    { headerName: 'Chapter', field: 'chapter_name', width: 200 },

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

    if (confirm("Are you sure to Delete " + data.chapter_name)) {
      console.log("Remove action clicked", data.id);
      this.deleteChapter(data.id)
      
    }
  }

}

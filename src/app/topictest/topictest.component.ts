import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';
@Component({
  selector: 'app-topictest',
  templateUrl: './topictest.component.html',
  styleUrls: ['./topictest.component.css']
})
export class TopictestComponent implements OnInit {

  topicForm: FormGroup;
  isSubmitted: boolean = false;
  rowData = [];
  allClass = [];
  allSubject = [];
  allMonth = [];
  classid: string = "";
  allChapter = [];
  allVideoDrop = [];
  Allquestion = [];

  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private fetchData: FetchdataService, private saveData: SaveDataService) { }

  ngOnInit() {
    this.topicForm = this.frmBuilder.group({
      class_name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subject_name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      chapter_name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      video_id: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      question: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      option1: ["", [Validators.minLength(1), Validators.maxLength(500)]],
      option2: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      option3: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      option4: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      answer: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(500)]]

    });

    this.getAllClass()
    this.getAllQuestion()
  }

  get class_name() { return this.topicForm.get('class_name'); }
  get subject_name() { return this.topicForm.get('subject_name'); }
  get chapter_name() { return this.topicForm.get('chapter_name'); }
  get video_id() { return this.topicForm.get('video_id'); }
  get question() { return this.topicForm.get('question'); }
  get option1() { return this.topicForm.get('option1'); }
  get option2() { return this.topicForm.get('option2'); }
  get option3() { return this.topicForm.get('option3'); }
  get option4() { return this.topicForm.get('option4'); }
  get answer() { return this.topicForm.get('answer'); }


  save() {

    this.isSubmitted = true;
    if (!this.topicForm.valid)
      return;

    this.saveData.postQuestionTopic(this.topicForm.value).
      subscribe(
        data => {
          alert("Data Inserted SuccessFully")
          this.getAllQuestion()

          this.question.setValue(null)
          this.option1.setValue(null)
          this.option2.setValue(null)
          this.option3.setValue(null)
          this.option4.setValue(null)
          this.answer.setValue(null)

        },
        error => {
          console.log(error);
          alert(error.error.message)
          // console.log(error);
        });
  }


  getAllQuestion() {
    this.fetchData.getQuestion().
      subscribe(
        data => {

          this.Allquestion = data.exam_question_setup
          this.rowData = this.Allquestion.filter(question => question.video_name !== null)
          console.log(this.rowData)
        },
        error => {

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

  getAllSubject(id: any) {
    this.classid = id;
    this.fetchData.getSubject(id).
      subscribe(
        data => {

          // console.log(data);
          this.allSubject = data.subject_data;
        },
        error => {
          alert(error.error.message)
          // console.log(error.error.message);
        });
  }

  getAllChapter(subjectid: any) {

    this.fetchData.getChapterList(this.classid, subjectid).
      subscribe(
        data => {
          this.allChapter = data.chapter_data
          // console.log(data);

        },
        error => {
          alert(error.error.message)
          // console.log(error.error.message);
        });
  }

  getVideoDropDown(chapterid: any) {

    this.fetchData.getVideoDrop(chapterid).
      subscribe(
        data => {
          this.allVideoDrop = data.chapter_video
          // console.log(data);

        },
        error => {
          alert(error.error.message)
          // console.log(error.error.message);
        });
  }

  deleteQuestion(id) {
    this.saveData.deleteOperation(id, 'exam_question').
      subscribe(
        data => {
          this.getAllQuestion()

          alert("Successfully Deleted")

        },
        error => {

          console.log(error.error.message);
        });
  }

  columnDefs = [

    { headerName: 'Video Name', field: 'video_name', width: 200 },
    { headerName: 'Class', field: 'class_name', width: 100 },
    // { headerName: 'Subject', field: 'subject_name', width: 100 },
    { headerName: 'Question', field: 'question', width: 200 },
    { headerName: 'Option 1', field: 'option1', width: 100 },
    { headerName: 'Option 2', field: 'option2', width: 100 },
    { headerName: 'Option 3', field: 'option3', width: 100 },
    { headerName: 'Option 4', field: 'option4', width: 100 },
    { headerName: 'Answer', field: 'answer', width: 100 },

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

    if (confirm("Are you sure to Delete " + data.question)) {
      console.log("Remove action clicked", data);
      this.deleteQuestion(data.eqs_id)
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';
@Component({
  selector: 'app-questionsetupweekly',
  templateUrl: './questionsetupweekly.component.html',
  styleUrls: ['./questionsetupweekly.component.css']
})
export class QuestionsetupweeklyComponent implements OnInit {
  QuestionForm: FormGroup;
  editQuestionForm: FormGroup;
  isSubmitted: boolean = false;
  rowData = [];
  examTitleData = [];
  classData = [];
  Allquestion = [];
  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private fetchData: FetchdataService, private saveData: SaveDataService) { }

  ngOnInit() {

    this.QuestionForm = this.frmBuilder.group({

      examTitle: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      class: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      question: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(5000)]],
      optA: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      optB: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      optC: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      optD: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      ans: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],



    });


    this.editQuestionForm = this.frmBuilder.group({

      editexamTitle: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      editclass: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      editQuestion: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(5000)]],
      editoptA: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      editoptB: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      editoptC: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      editoptD: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      editans: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      editId: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],



    });

    this.getExamDrop()
    this.getClassDrop()
    this.getAllQuestion()

  }

  get examTitle() { return this.QuestionForm.get('examTitle'); }
  get class() { return this.QuestionForm.get('class'); }
  get question() { return this.QuestionForm.get('question'); }
  get optA() { return this.QuestionForm.get('optA'); }
  get optB() { return this.QuestionForm.get('optB'); }
  get optC() { return this.QuestionForm.get('optC'); }
  get optD() { return this.QuestionForm.get('optD'); }
  get ans() { return this.QuestionForm.get('ans'); }

  get editId() { return this.editQuestionForm.get('editId'); }
  get editexamTitle() { return this.editQuestionForm.get('editexamTitle'); }
  get editclass() { return this.editQuestionForm.get('editclass'); }
  get editQuestion() { return this.editQuestionForm.get('editQuestion'); }
  get editoptA() { return this.editQuestionForm.get('editoptA'); }
  get editoptB() { return this.editQuestionForm.get('editoptB'); }
  get editoptC() { return this.editQuestionForm.get('editoptC'); }
  get editoptD() { return this.editQuestionForm.get('editoptD'); }
  get editans() { return this.editQuestionForm.get('editans'); }

  save() {

    this.isSubmitted = true;
    if (!this.QuestionForm.valid)
      return;

    this.saveData.postQuestion(this.QuestionForm.value).
      subscribe(
        data => {
          alert("Data Inserted SuccessFully")
          this.getAllQuestion()
         
          this.question.setValue(null)
          this.optA.setValue(null)
          this.optB.setValue(null)
          this.optC.setValue(null)
          this.optD.setValue(null)
          this.ans.setValue(null)

        },
        error => {
          console.log(error);
          alert(error.error.message)
          // console.log(error);
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


  getAllQuestion() {
    this.fetchData.getQuestion().
      subscribe(
        data => {
          this.Allquestion = data.exam_question_setup
          this.rowData = this.Allquestion.filter(question => question.title_name !== null)



        },
        error => {

          console.log(error.error);
        });
  }



  updateQuestion()
  {
    this.saveData.updateQuestion(this.editQuestionForm.value).
    subscribe(
      data => {
        this.getAllQuestion()

        alert("Successfully Updated")

      },
      error => {
        alert(error.error.message)
      
        console.log(error.error.message);
      });
  }



  columnDefs = [

    { headerName: 'Exam Title Name', field: 'title_name', width: 200 },
    { headerName: 'Class', field: 'class_name', width: 100 },
    { headerName: 'Subject', field: 'subject_name', width: 100 },
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

    this.editexamTitle.setValue(data.title_name)
    this.editclass.setValue(data.class_name)
    this.editQuestion.setValue(data.question)
    this.editId.setValue(data.eqs_id)
    this.editans.setValue(data.answer)
    this.editoptA.setValue(data.option1)
    this.editoptB.setValue(data.option2)
    this.editoptC.setValue(data.option3)
    this.editoptD.setValue(data.option4)

  }

  public onActionRemoveClick(data: any) {

    if (confirm("Are you sure to Delete " + data.question)) {
      // console.log("Remove action clicked", data);
      this.deleteQuestion(data.eqs_id)
    }
  }
}

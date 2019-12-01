import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';

@Component({
  selector: 'app-classsetup',
  templateUrl: './classsetup.component.html',
  styleUrls: ['./classsetup.component.css']
})
export class ClasssetupComponent implements OnInit {
  classForm: FormGroup;
  allClass: any;
  isSubmitted: boolean = false;
  rowData = [];
  allMonth: any;
  editfunForm: FormGroup;

  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private fetchData: FetchdataService, private saveData: SaveDataService) { }


  ngOnInit() {

    this.classForm = this.frmBuilder.group({

      className: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subject: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      month_id: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });

    this.editfunForm = this.frmBuilder.group({
      editSubject: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
      editMonth: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      editClass: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      editId: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]

    });
    this.getAllClass();
    this.getSubject();
    this.getMonth()
  }


  get subject() { return this.classForm.get('subject'); }
  get className() { return this.classForm.get('className'); }
  get month_id() { return this.classForm.get('month_id'); }


  get editSubject() { return this.editfunForm.get('editSubject'); }
  get editMonth() { return this.editfunForm.get('editMonth'); }
  get editClass() { return this.editfunForm.get('editClass'); }
  get editId() { return this.editfunForm.get('editId'); }

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



  save() {

    this.isSubmitted = true;
    if (!this.classForm.valid)
      return;

    this.saveData.saveSubject(this.classForm.value).
      subscribe(
        data => {
          // this.alert.success("Data Inserted SuccessFully")
          this.getSubject()
          alert("Data Inserted SuccessFully")
          this.classForm.reset()

          if (data) {
            console.log(data);
            setTimeout(() => {

              // this.reset();
            }, 2000);
          }

        },
        error => {
          console.log(error);
          // this.alert.error(error.error.message)
          alert(error.error.message)
          // console.log(error);
        });
  }

  deleteSubject(id) {
    this.saveData.deleteOperation(id, 'subject').
      subscribe(
        data => {
          this.getSubject()

          alert("Successfully Deleted")

        },
        error => {

          console.log(error.error.message);
        });
  }

  getSubject() {
    this.fetchData.getAllSubject().
      subscribe(
        data => {

          // console.log(data);

          this.rowData = data.subject;


        },
        error => {

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

  updateSubject()
  {
    this.saveData.updateSubject(this.editfunForm.value).
    subscribe(
      data => {
        
        this.getSubject();

        alert("Successfully Updated")

      },
      error => {
        alert(error.error.message)
      
        console.log(error.error.message);
      });
  }


  columnDefs = [
    { headerName: 'Subject ID', field: 'id', width: 100 },
    { headerName: 'Class', field: 'name', width: 100 },
    { headerName: 'Subject Name', field: 'subjectName', width: 150 },
    { headerName: 'Month', field: 'month_name', width: 150 },
    // { headerName: 'Added Date', field: 'modified', width: 150 },
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
    // console.log("View action clicked", data);

    this.editClass.setValue(data.name)
    this.editId.setValue(data.id)
    this.editMonth.setValue(data.month_name)
    this.editSubject.setValue(data.subjectName)

  }

  public onActionRemoveClick(data: any) {

    if (confirm("Are you sure to Delete " + data.subjectName)) {
      console.log("Remove action clicked", data.subjectName);
      this.deleteSubject(data.id)
    }
  }


}

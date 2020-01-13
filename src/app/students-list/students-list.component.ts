import { Component, OnInit } from '@angular/core';
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  rowData = [];
  StudentEdit: FormGroup;
  classData = [];
  isSubmitted = false
  feeDetails:any

  constructor(private frmBuilder: FormBuilder, private fetchData: FetchdataService, private saveData: SaveDataService) { }

  ngOnInit() {

    this.StudentEdit = this.frmBuilder.group({

      class_id: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      first_name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      last_name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      contact: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      user_id: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],

    });


    this.getClassDrop()
    this.getStudentsList();
  }

  get first_name() { return this.StudentEdit.get('first_name'); }
  get email() { return this.StudentEdit.get('email'); }
  get contact() { return this.StudentEdit.get('contact'); }
  get last_name() { return this.StudentEdit.get('last_name'); }
  get class_id() { return this.StudentEdit.get('class_id'); }
  get user_id() { return this.StudentEdit.get('user_id'); }


  getClassDrop() {
    this.fetchData.getClass().
      subscribe(
        data => {

          this.classData = data.class;
          // console.log(this.classData)
        },
        error => {

          console.log(error.error);
        });
  }

  getStudentsList() {
    this.fetchData.getStudentsList().
      subscribe(
        data => {

          // console.log(data);

          this.rowData = data.class;


        },
        error => {

          console.log(error.error);
        });
  }

  getFeeDetails(id) {
    this.fetchData.getFeeDetails(id).
      subscribe(
        data => {

          console.log(data)
this.feeDetails=data.data

        },
        error => {

          console.log(error.error);
        });
  }


  deleteStudent(id) {
    this.saveData.deleteOperation(id, 'user').
      subscribe(
        data => {
          this.getStudentsList()

          alert("Successfully Deleted")

        },
        error => {

          console.log(error.error.message);
        });
  }


  save() {
    this.isSubmitted = true
    if (!this.StudentEdit.valid) {
      return
    }
    this.saveData.updateStudent(this.StudentEdit.value).
      subscribe(
        data => {
          this.getStudentsList()

          alert("Successfully Updated")

        },
        error => {
          alert(error.error.message)
          console.log(error.error.message);
        });
  }

  columnDefs = [
    { headerName: 'Student ID', field: 'user_id', width: 100 },
    { headerName: 'First Name', field: 'first_name', width: 150 },
    { headerName: 'Last Name', field: 'last_name', width: 120 },
    { headerName: 'Class', field: 'class_name', width: 120 },
    { headerName: 'Email', field: 'email', width: 150 },
    { headerName: 'Contact', field: 'contact', width: 150 },
    { headerName: 'Address', field: 'address', width: 200 },
    {
      headerName: 'Edit', suppressFilter: true, width: 80,
      suppressSorting: true,
      autoHeight: true, template:
        `
  <button type="button" data-action-type="edit" class="btn btn-primary" data-toggle="modal" data-target="#edit">
     Edit
  </button>` },

    {
      headerName: "Edit",
      suppressFilter: true,
      suppressSorting: true,
      autoHeight: true,

      template:
        `<button type="button" data-action-type="view" class="btn btn-primary" data-toggle="modal" data-target="#fee">
         Fee Details
       </button>

      <button type="button" data-action-type="remove" class="btn btn-warning">
         Delete
      </button>
      `
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
        case "edit":
          return this.onActionEditClick(data);
      }
    }
  }

  public onActionViewClick(data: any) {
    // console.log("View action clicked", data);

this.getFeeDetails(data.user_id)

  }

  public onActionEditClick(data: any) {
    // console.log("View action clicked", data);
    this.user_id.setValue(data.user_id)
    this.first_name.setValue(data.first_name)
    this.last_name.setValue(data.last_name)
    this.class_id.setValue(data.class_id)
    this.email.setValue(data.email)
    this.contact.setValue(data.contact)


  }

  public onActionRemoveClick(data: any) {

    if (confirm("Are you sure to Delete " + data.first_name)) {
      console.log("Remove action clicked", data);
      this.deleteStudent(data.id)
    }
  }
}

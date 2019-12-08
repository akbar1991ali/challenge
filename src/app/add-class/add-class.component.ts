import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  classForm: FormGroup;
  editclassForm: FormGroup;
  isSubmitted: boolean = false;
  rowData = [];
  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private fetchData: FetchdataService, private saveData: SaveDataService) { }


  ngOnInit() {

    this.classForm = this.frmBuilder.group({

      class_name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],

    });

    this.editclassForm = this.frmBuilder.group({

      editclass_name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      editId: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],

    });


    this.getAllClass();

  }


  get class_name() { return this.classForm.get('class_name'); }


  get editclass_name() { return this.editclassForm.get('editclass_name'); }
  get editId() { return this.editclassForm.get('editId'); }




  getAllClass() {
    this.fetchData.getClass().
      subscribe(
        data => {

          // console.log(data);
          this.rowData = data.class;



        },
        error => {

          console.log(error.error);
        });
  }


  save() {

    this.isSubmitted = true;
    if (!this.classForm.valid)
      return;

    this.saveData.postClass(this.classForm.value).
      subscribe(
        data => {
          // this.alert.success("Data Inserted SuccessFully")

          alert("Data Inserted SuccessFully")
          this.getAllClass()

        },
        error => {
          // console.log(error);
          // this.alert.error(error.error.message)
          alert(error.error.message)
      
        });
  }

  deleteClass(data) {


    this.saveData.deleteOperation(data,'class').
      subscribe(
        data => {
          // this.alert.success("Data Inserted SuccessFully")

          alert("Class Deleted SuccessFully")
          this.getAllClass()

        },
        error => {
          console.log(error);
          // this.alert.error(error.error.message)
          alert(error.error.message)
          // console.log(error);
        });
  }

  updateClass()
  {
    this.saveData.updateClass(this.editclassForm.value).
    subscribe(
      data => {
        this.getAllClass()

        alert("Successfully Updated")

      },
      error => {
        alert(error.error.message)
      
        console.log(error.error.message);
      });
  }



  columnDefs = [
    { headerName: 'Class ID', field: 'id', width: 100 },
    { headerName: 'Class', field: 'name', width: 200 },

    {
      headerName: "Actions",
      suppressFilter: true,
      suppressSorting: true,
      autoHeight: true,

      template:
        `
        <button type="button" data-action-type="edit" class="btn btn-primary" data-toggle="modal" data-target="#edit">
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
    this.editclass_name.setValue(data.name)
    this.editId.setValue(data.id)

  }

  public onActionRemoveClick(data: any) {

    if (confirm("Are you sure to Delete " + data.name)) {
      // console.log("Remove action clicked", data);
      this.deleteClass(data.id)
    }
  }

}

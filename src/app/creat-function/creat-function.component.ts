import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-creat-function',
  templateUrl: './creat-function.component.html',
  styleUrls: ['./creat-function.component.css']
})
export class CreatFunctionComponent implements OnInit {
  funForm: FormGroup;
  editfunForm: FormGroup;
  result: any = null;
  editresult: any = null;
  isSubmitted: boolean = false;
  rowData = [];
  allClass = [];
  allMonth = [];



  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private fetchData: FetchdataService, private saveData: SaveDataService, private alert: AlertService) { }

  ngOnInit() {
    this.funForm = this.frmBuilder.group({
      amount: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(5), Validators.pattern("^[0-9].*$")]],
      className: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      monthName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]

    });


    this.editfunForm = this.frmBuilder.group({
      editAmount: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(5),Validators.pattern("^[0-9].*$")]],
      editMonth: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      editClass: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      editId: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]

    });

    this.getAllClass();
    this.getFee();
  }


  get amount() { return this.funForm.get('amount'); }
  get className() { return this.funForm.get('className'); }
  get monthName() { return this.funForm.get('monthName'); }

  get editAmount() { return this.editfunForm.get('editAmount'); }
  get editMonth() { return this.editfunForm.get('editMonth'); }
  get editClass() { return this.editfunForm.get('editClass'); }
  get editId() { return this.editfunForm.get('editId'); }


  save() {

    this.isSubmitted = true;
    if (!this.funForm.valid)
      return;

    this.saveData.saveFee(this.funForm.value).
      subscribe(
        data => {
          this.alert.success("Data Inserted SuccessFully")
          alert("Data Inserted SuccessFully")
          this.getFee();

          if (data) {
            console.log(data);
            setTimeout(() => {

              // this.reset();
            }, 2000);
          }

        },
        error => {
          console.log(error);
          this.alert.error(error.error.message)
          alert(error.error.message)
          // console.log(error);
        });
  }

  getAllClass() {
    this.fetchData.getClass().
      subscribe(
        data => {

          console.log(data);
          this.allClass = data.class;
          this.allMonth = data.month;


        },
        error => {

          console.log(error.error);
        });
  }


  getFee() {
    this.fetchData.getFee().
      subscribe(
        data => {

          console.log(data);

          this.rowData = data.class;


        },
        error => {

          console.log(error.error);
        });
  }

  deleteFee(id) {
    this.saveData.deleteOperation(id, 'fee').
      subscribe(
        data => {
          this.getFee()

          alert("Successfully Deleted")

        },
        error => {

          console.log(error.error.message);
        });
  }



  columnDefs = [
    { headerName: 'Class ID', field: 'id', width: 100 },
    { headerName: 'Class Name', field: 'name', width: 100 },
    { headerName: 'Month Name', field: 'monthname', width: 200 },
    { headerName: 'Fee', field: 'fee', width: 150 },
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
    this.editAmount.setValue(data.fee)
    this.editClass.setValue(data.name)
    this.editMonth.setValue(data.monthname)
    this.editId.setValue(data.id)



  }

  public onActionRemoveClick(data: any) {

    if (confirm("Are you sure to Delete " + data.name)) {
      console.log("Remove action clicked", data);
      this.deleteFee(data.fee_id)

    }
  }

}

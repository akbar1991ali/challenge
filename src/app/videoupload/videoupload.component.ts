import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { FetchdataService } from '../_services/fetchdata.service';
import { SaveDataService } from '../_services/save-data.service';

@Component({
  selector: 'app-videoupload',
  templateUrl: './videoupload.component.html',
  styleUrls: ['./videoupload.component.css']
})
export class VideouploadComponent implements OnInit {
  videoForm: FormGroup;
  EditvideoForm: FormGroup;
  isSubmitted: boolean = false;
  rowData = [];
  allClass = [];
  allSubject = [];
  allMonth = [];
  classid: string = "";
  allChapter = [];
  fileUploadPer: any;
  fileUploadPerEdit: any;
  editData: any

  constructor(private frmBuilder: FormBuilder, private http: HttpClient,
    private fetchData: FetchdataService, private saveData: SaveDataService) { }

  ngOnInit() {
    this.videoForm = this.frmBuilder.group({
      className: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      chapterName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      subjectName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      monthName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      video: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      pdf: ["", [Validators.minLength(1), Validators.maxLength(50)]],
      thumb: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      videoDesc: ["",],
      videoTitle: ["", Validators.required]

    });

    this.EditvideoForm = this.frmBuilder.group({
      EditclassName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      EditchapterName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      EditsubjectName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      EditmonthName: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      Editvideo: ["", []],
      Editpdf: ["", []],
      Editthumb: ["", []],
      EditvideoDesc: ["",],
      EditvideoTitle: ["", Validators.required],
      EditvideoId: ["", Validators.required]


    });

    this.getAllClass()
    this.getMonth()
    this.getAllVideo()
  }

  get monthName() { return this.videoForm.get('monthName'); }
  get className() { return this.videoForm.get('className'); }
  get chapterName() { return this.videoForm.get('chapterName'); }
  get subjectName() { return this.videoForm.get('subjectName'); }
  get video() { return this.videoForm.get('video'); }
  get pdf() { return this.videoForm.get('pdf'); }
  get thumb() { return this.videoForm.get('thumb'); }
  get videoDesc() { return this.videoForm.get('videoDesc'); }
  get videoTitle() { return this.videoForm.get('videoTitle'); }

  get EditmonthName() { return this.videoForm.get('EditmonthName'); }
  get EditclassName() { return this.videoForm.get('EditclassName'); }
  get EditchapterName() { return this.videoForm.get('EditchapterName'); }
  get EditsubjectName() { return this.videoForm.get('EditsubjectName'); }
  get Editvideo() { return this.videoForm.get('Editvideo'); }
  get Editpdf() { return this.videoForm.get('Editpdf'); }
  get Editthumb() { return this.videoForm.get('Editthumb'); }
  get EditvideoDesc() { return this.videoForm.get('EditvideoDesc'); }
  get EditvideoTitle() { return this.videoForm.get('EditvideoTitle'); }
  get EditvideoId() { return this.videoForm.get('EditvideoId'); }

  // file Upload
  onSubmit(): void {
    const uploadData = new FormData();
    uploadData.append('class_id', this.videoForm.get('className').value);
    uploadData.append('chapter_id', this.videoForm.get('chapterName').value);
    uploadData.append('subject_id', this.videoForm.get('subjectName').value);
    uploadData.append('month_id', this.videoForm.get('monthName').value);
    uploadData.append('video_upload[]', this.videoForm.get('video').value);
    uploadData.append('thumb_upload[]', this.videoForm.get('thumb').value);
    uploadData.append('pdf_upload[]', this.videoForm.get('pdf').value);
    uploadData.append('video_title', this.videoForm.get('videoTitle').value);
    uploadData.append('video_desc', this.videoForm.get('videoDesc').value);
    //    console.log(uploadData)
    this.saveData.uploadVideo(uploadData).
      subscribe(
        data => {

          if (data.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            const percentDone = Math.round(100 * data.loaded / data.total);
            // console.log(`File is ${percentDone}% uploaded.`);
            this.fileUploadPer = percentDone;
          } else if (data instanceof HttpResponse) {
            console.log('File is completely uploaded!');
            this.getAllVideo()
            alert("Successfully Video Saved")


          }

          //  console.log(data);
          //  this.getAllVideo()
          //  alert("Successfully Video Saved")
          this.video.setValue(null)
          this.pdf.setValue(null)
          this.thumb.setValue(null)
          this.videoDesc.setValue(null)
          this.videoTitle.setValue(null)
          // this.videoForm.reset()
        },
        error => {

          console.log(error.error);
        });
  }



  // editFileUpload
  // file Upload
  editSave(): void {
    const uploadData = new FormData();
    // uploadData.append('class_id', this.EditvideoForm.get('EditclassName').value);
    // uploadData.append('chapter_id', this.EditvideoForm.get('EditchapterName').value);
    // uploadData.append('subject_id', this.EditvideoForm.get('EditsubjectName').value);
    // uploadData.append('month_id', this.EditvideoForm.get('EditmonthName').value);
    uploadData.append('video_upload[]', this.EditvideoForm.get('Editvideo').value);
    uploadData.append('thumb_upload[]', this.EditvideoForm.get('Editthumb').value);
    uploadData.append('pdf_upload[]', this.EditvideoForm.get('Editpdf').value);
    uploadData.append('video_title', this.EditvideoForm.get('EditvideoTitle').value);
    uploadData.append('video_desc', this.EditvideoForm.get('EditvideoDesc').value);
    uploadData.append('id', this.EditvideoForm.get('EditvideoId').value);
    //    console.log(uploadData)
    this.saveData.edituploadVideo(uploadData).
      subscribe(
        data => {

          if (data.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            const percentDone = Math.round(100 * data.loaded / data.total);
            // console.log(`File is ${percentDone}% uploaded.`);
            this.fileUploadPerEdit = percentDone;
          } else if (data instanceof HttpResponse) {
            // console.log('File is completely uploaded!');
            this.getAllVideo()
            alert("Successfully Video Saved")


          }

          //  console.log(data);
          //  this.getAllVideo()
          //  alert("Successfully Video Saved")
          // this.Editvideo.setValue(null)
          // this.Editpdf.setValue(null)
          // this.Editthumb.setValue(null)
          // this.EditvideoDesc.setValue(null)
          // this.EditvideoTitle.setValue(null)
          // this.videoForm.reset()
        },
        error => {

          console.log(error.error);
        });
  }

  uploadVideo(event: any) {
    if (event.target.files && event.target.files[0]) {

      const reader = new FileReader();
      reader.onload = () => {
        // console.log(event.target.files[0])
        this.videoForm.get('video').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadThum(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.videoForm.get('thumb').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  uploadPdf(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.videoForm.get('pdf').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  edituploadVideo(event: any) {
    if (event.target.files && event.target.files[0]) {

      const reader = new FileReader();
      reader.onload = () => {
        console.log(event.target.files[0])
        this.EditvideoForm.get('Editvideo').patchValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  edituploadThum(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.EditvideoForm.get('Editthumb').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  edituploadPdf(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.EditvideoForm.get('Editpdf').setValue(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
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

  getAllVideo() {

    this.fetchData.getAllVideo().
      subscribe(
        data => {
          // console.log(data);
          this.rowData = data['video_pdf_data']


        },
        error => {
          // alert(error.error.message)
          // console.log(error.error.message);
        });
  }

  // getChapterdata() {

  //   this.fetchData.getChapter().
  //     subscribe(
  //       data => {


  //         this.rowData = data['chapter_data']
  //         console.log(data);
  //       },
  //       error => {
  //         // console.log(error)
  //         console.log(error.error);
  //       });
  // }



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


  deleteVideo(videoid) {

    this.saveData.deleteVideo(videoid).
      subscribe(
        data => {

          alert(data.message)
          this.getAllVideo()
          // console.log(data);
        },
        error => {
          alert(error.error.message)
          console.log(error.error.message);
        });
  }

  columnDefs = [
    { headerName: 'Class ', field: 'class_name', width: 100 },
    { headerName: 'Subject', field: 'subjectName', width: 100 },
    { headerName: 'Chapter', field: 'chapter_name', width: 200 },
    { headerName: 'Month Name', field: 'month_name', width: 120 },
    { headerName: 'Video Title', field: 'video_title', width: 120 },
    {
      headerName: 'thumbnail', template:
        `<img src="" alt="No Image">
`, field: '', width: 120
    },


    {
      headerName: "Actions",

      autoHeight: true,

      template:
        `
      <button type="button" data-action-type="remove" class="btn btn-warning">
         Delete
      </button>
      <button type="button" data-action-type="edit" class="btn btn-success" data-toggle="modal" data-target="#edit">
         Edit
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

  setValue(data) {

    this.EditvideoForm.patchValue({ EditmonthName: data.month_name,
       EditclassName: data.class_name,
       EditchapterName: data.chapter_name,
        EditsubjectName: data.subjectName,
         EditvideoId: data.video_id,
         Editvideo:null,
         Editpdf:null,
         Editthumb:null,
         EditvideoDesc:null,
         EditvideoTitle:null,
        })
    // this.EditmonthName.setValue(data.month_name)
    // this.EditclassName.patchValue(data.class_name)
    // this.EditchapterName.patchValue(data.chapter_name)
    // this.EditsubjectName.patchValue(data.subjectName)
    // this.Editvideo.patchValue(data.)
    // this.Editpdf.patchValue(data.)
    // this.Editthumb.patchValue(data.)
    // this.EditvideoDesc.patchValue(data.video_desc)
    // this.EditvideoTitle.patchValue(data.)
    // this.EditvideoId.patchValue(data.video_id)
  }

  public onActionViewClick(data: any) {
    this.editData = []
    this.editData = data
    this.setValue(data)


    console.log("View action clicked", data);

  }

  public onActionRemoveClick(data: any) {

    if (confirm("Are you sure to Delete class " + data.class_name + " Month " +
      data.month_name + " Subject " + data.subjectName + " Video " + data.video_desc)) {
      console.log("Remove action clicked", data.video_id);

      this.deleteVideo(data.video_id)
    }
  }

}

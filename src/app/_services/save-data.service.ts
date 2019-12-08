import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient ,HttpRequest} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SaveDataService {

  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }


  saveFee(formdata: any) {
    return this.http.post<any>(this.apiUrl + 'class.php', formdata)
      .pipe(map(data => {


        return data;
      }));

  }

  saveSubject(formdata: any) {
    return this.http.post<any>(this.apiUrl + 'subjectSetup.php', { subjectName: formdata.subject, classid: formdata.className, month_id: formdata.month_id })
      .pipe(map(data => {


        return data;
      }));

  }

  uploadVideo(formdata: any) {
    // return this.http.post<any>(this.apiUrl + 'upload_video.php', formdata, {
    //   reportProgress: true,
    // })
    //   .pipe(map(data => {


    //     return data;
    //   }));
    return this.http.post(this.apiUrl + 'upload_video.php', formdata, { reportProgress: true, observe: 'events' })

      // const req = new HttpRequest('POST', this.apiUrl + 'upload_video.php', formdata, {
      //   reportProgress: true,
      // });
  }

  
  edituploadVideo(formdata: any) {
    // return this.http.post<any>(this.apiUrl + 'upload_video.php', formdata, {
    //   reportProgress: true,
    // })
    //   .pipe(map(data => {


    //     return data;
    //   }));
    return this.http.post(this.apiUrl + 'file_update.php', formdata, { reportProgress: true, observe: 'events' })

      // const req = new HttpRequest('POST', this.apiUrl + 'upload_video.php', formdata, {
      //   reportProgress: true,
      // });
  }


  postExamTitle(formdata: any) {
    return this.http.post<any>(this.apiUrl + 'exam_title_master.php',
     { title_name: formdata.examTitle ,
      class_id:formdata.class_id,
      start_time:formdata.startDate,
      end_time :formdata.endDate
    })
      .pipe(map(data => {


        return data;
      }));

  }

  postExam(formdata: any) {
    return this.http.post<any>(this.apiUrl + 'exam_setup.php', {
      title_id: formdata.examTitle,
      start_time: formdata.startDate,
      end_time: formdata.endDate
    })
      .pipe(map(data => {


        return data;
      }));

  }

  postQuestion(formdata: any) {
    return this.http.post<any>(this.apiUrl + 'exam_question_setup.php',[ {
      title_id: formdata.examTitle,
      class_id: formdata.class,
      question: formdata.question,
      option1: formdata.optA,
      option2: formdata.optB,
      option3: formdata.optC,
      option4: formdata.optD,
      flag: 1,
      answer: formdata.ans
    }])
      .pipe(map(data => {


        return data;
      }));

  }


  postQuestionTopic(formdata: any) {
    return this.http.post<any>(this.apiUrl + 'exam_question_setup.php',[ {
      video_id: formdata.video_id,
      subject_id: formdata.subject_name,
      class_id: formdata.class_name,
      question: formdata.question,
      option1: formdata.option1,
      option2: formdata.option2,
      option3: formdata.option3,
      option4: formdata.option4,
      flag: 1,
      answer: formdata.answer
    }])
      .pipe(map(data => {


        return data;
      }));

  }


  postClass(formdata: any) {
    return this.http.post<any>(this.apiUrl + 'student_class.php', {
      class_name: formdata.class_name,
      session: '2019-2020',
      action:'add_class'
    
    })
      .pipe(map(data => {


        return data;
      }));

  }
  deleteClass(classid: any) {
    return this.http.post<any>(this.apiUrl + 'add_class.php',{
      class_id:classid,
      action:'delete'
    })
      .pipe(map(data => {
        return data;
      }));

  }


  deleteVideo(videoid: any) {
    return this.http.post<any>(this.apiUrl + 'video_operation.php',{
      video_id:videoid,
      action:'delete'
    })
      .pipe(map(data => {
        return data;
      }));

  }

  deleteOperation(id,action)
  {
    return this.http.post<any>(this.apiUrl + 'delete_operation.php',{
      id:id,
      target:action
    })
      .pipe(map(data => {
        return data;
      }));
  }

  ///////////Update /////////////
  updateStudent(data)
  {
    
      return this.http.post<any>(this.apiUrl + 'data_update.php',{id:data.user_id,target:'student',
      field:{
        "fname": data.first_name,
        "lname":data.last_name,
        "email":data.email,
        "contact":data.contact,
        "class":data.class_id
      }
    
      })
        .pipe(map(data => {
          return data;
        }));
    
  }


  updateFee(data)
  {
    
      return this.http.post<any>(this.apiUrl + 'data_update.php',{id:data.editId,target:'fee',
      field:{
        "amount": data.editAmount
      }
    
      })
        .pipe(map(data => {
          return data;
        }));
    
  }
  updateSubject(data)
  
    {
      return this.http.post<any>(this.apiUrl + 'data_update.php',{id:data.editId,target:'subject',
      field:{
        "subject_name": data.editSubject
      }
    
      })
        .pipe(map(data => {
          return data;
        }));
    }
  
    updateChapter(data)
  
    {
      return this.http.post<any>(this.apiUrl + 'data_update.php',{id:data.editId,target:'chapter',
      field:{
        "name": data.editChapter
      }
    
      })
        .pipe(map(data => {
          return data;
        }));
    }

    updateExam(data)
  
    {
      return this.http.post<any>(this.apiUrl + 'data_update.php',{id:data.editId,target:'week_exam_time',
      field:{
        "start_time": data.editStartTime,
        "end_time": data.editEndTime
      }
    
      })
        .pipe(map(data => {
          return data;
        }));
    }

    updateQuestion(data)
  
    {
      return this.http.post<any>(this.apiUrl + 'data_update.php',{id:data.editId,target:'week_exam_question',
      field:{
        "question":data.editQuestion,
        "option1": data.editoptA,
        "option2":data.editoptB,
        "option3": data.editoptC,
        "option4": data.editoptD,
      }
    
      })
        .pipe(map(data => {
          return data;
        }));
    }
  
    updateQuestionTopic(data)
  
    {
      return this.http.post<any>(this.apiUrl + 'data_update.php',{id:data.editquestion_id,target:'topic_exam_question',
      field:{
        "question":data.editquestion,
        "option1": data.editoption1,
        "option2":data.editoption2,
        "option3": data.editoption3,
        "option4": data.editoption4,
      }
    
      })
        .pipe(map(data => {
          return data;
        }));
    }

}

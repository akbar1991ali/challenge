import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FetchdataService {
  apiUrl=environment.baseUrl;
 
  constructor(private http: HttpClient) { }


  getClass() {
    return this.http.get<any>(this.apiUrl+'class.php')
        .pipe(map(data => {
           
          
            return data;
        }));

      }

      getSubject(classid:any) {
        return this.http.post<any>(this.apiUrl+'show_subject.php' ,{"class_id":classid})
            .pipe(map(data => {
               
              
                return data;
            }));
    
          }

          getChapter() {
            return this.http.get<any>(this.apiUrl+'chapter.php')
                .pipe(map(data => {
                   
                  
                    return data;
                }));
        
              }

              getChapterList(classid:any,subjectid:any) {
                return this.http.post<any>(this.apiUrl+'show_chapter.php',{
                  "class_id":classid,
                  "subject_id":subjectid,
                
                })
                    .pipe(map(data => {
                       
                      
                        return data;
                    }));
            
                  }

                  getAllVideo() {
                    return this.http.get<any>(this.apiUrl+'show_video_pdf.php')
                        .pipe(map(data => {
                            return data;
                        }));
                
                      }

              postChapter(formdata:any) {
                return this.http.post<any>(this.apiUrl+'chapter.php',{
                  "class_id":formdata.className,
                  "subject_id":formdata.subjectName,
                  "chapter_name":formdata.chapterName,
                  "month_id":formdata.monthName
                })
                    .pipe(map(data => {
                       
                      
                        return data;
                    }));
            
                  }

              getMonth() {
                return this.http.get<any>(this.apiUrl+'show_month.php')
                    .pipe(map(data => {
                       
                      
                        return data;
                    }));
            
                  }

      getFee() {
        return this.http.get<any>(this.apiUrl+'fee.php')
            .pipe(map(data => {
               
              
                return data;
            }));
    
          }

          getStudentsList() {
            return this.http.get<any>(this.apiUrl+'students.php')
                .pipe(map(data => {
                   
                  
                    return data;
                }));
        
              }

              getAllSubject() {
            return this.http.get<any>(this.apiUrl+'subjectSetup.php')
                .pipe(map(data => {
                   
                  
                    return data;
                }));
        
              }  
              
              getExamTitle() {
                return this.http.get<any>(this.apiUrl+'exam_title_master.php')
                    .pipe(map(data => {
                       
                      
                        return data;
                    }));
            
                  } 

                  getExam() {
                    return this.http.get<any>(this.apiUrl+'exam_setup.php')
                        .pipe(map(data => {
                           
                          
                            return data;
                        }));
                
                      } 


                      getQuestion() {
                        return this.http.get<any>(this.apiUrl+'exam_question_setup.php')
                            .pipe(map(data => {
                               
                              
                                return data;
                            }));
                    
                          } 

                          
                      getVideoDrop(chapterid) {
                        return this.http.post<any>(this.apiUrl+'chapter_video.php',{chapter_id:chapterid})
                            .pipe(map(data => {
                               
                              
                                return data;
                            }));
                    
                          }

                          getFeeDetails(id) {
                            return this.http.post<any>(this.apiUrl+'payment_history.php',{user_id:id})
                                .pipe(map(data => {
                                   
                                    return data;
                                }));
                        
                              }


}

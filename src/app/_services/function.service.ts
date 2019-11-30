import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,FormBuilder, Validators} from '@angular/forms' 
import { HttpRequest, HttpHandler,HttpEvent,HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private frmBuilder: FormBuilder,private http: HttpClient) { }

save(formdata:any)
{
return this.http.post<any>('/function/',{functionName:formdata.functionName})
.pipe(map(data=>{

return data;
}))
}


getAllFunction()
{
  return this.http.get<any>('/function/')
.pipe(map(allFunction=>{

return allFunction;
}))
}


disableFunction(functionId:string)
{
  return this.http.put<any>('/function/'+functionId,'')
.pipe(map(disableFun=>{

return disableFun;
}))
}


getOneFunctionDetail(functionId:string)
{
  return this.http.get<any>('/function/'+functionId)
  .pipe(map(oneFunction=>{
  
  return oneFunction;
  }))
}

editFunctionNameStatus(formData:any)
{
  return this.http.put<any>('/function/',{functionId:formData.editfunctionId,functionName:formData.editfunctionName,status:formData.editfunctionStatus  })
.pipe(map(updateFun=>{

return updateFun;
}))
}

}

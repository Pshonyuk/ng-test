import {Injectable} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class HttpService{
    constructor(private http: Http){ }

    postData(obj){
        const body = JSON.stringify(obj);

        let headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });
        this.http.get('http://localhost:3001/api/users').subscribe((data: Response) => console.log(data.json()));

        return this.http.post('http://localhost:3001/api/users/', body)
            .map((resp:Response)=>resp.json())
            .catch((error:any) =>{return Observable.throw(error);});
    }
}


@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    providers: [HttpService]
})
export class CreateComponent implements OnInit {
    public email: string;
    public password: string;
    public confirmPassword: string;

    constructor(private httpService: HttpService) {
        // this.userFormGroup =
    }

    ngOnInit() {
    }

    onSubmit() {
        const body = JSON.stringify({
            email: "email@ddf",
            password: this.password
        });

        this.httpService.postData(body);
    }
}

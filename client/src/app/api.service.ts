import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService {
	static get apiURL(): string {
		return 'http://localhost:3000/api/';
	}

	constructor(private _http: Http) {
	}

	public post(apiKey: string, data: any): Observable<Response> {
		const body: string = JSON.stringify(data),
			headers: Headers = new Headers({ 'Content-Type': 'application/json;charset=utf-8' });

		return this._http.post(ApiService.apiURL + apiKey, body, { headers })
			.map(data => data.json());
	}

	public get(apiKey: string): Observable<Response> {
		return this._http.get(ApiService.apiURL + apiKey)
			.map((data: Response) => data.json());
	}
}

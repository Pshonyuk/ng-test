import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
type editorAction = 'add' | 'edit';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public action: editorAction = 'add';
  public author: string = '';
  public title: string = '';
  public description: string = '';
  public status: boolean = false;

  public get fileTitle() {
    return this.action === 'add' ? 'select file upload' : 'replace file';
  }

  constructor(private activateRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activateRoute.data.subscribe(data => this.action = data['action']);
  }
}

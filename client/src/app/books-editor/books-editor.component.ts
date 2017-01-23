import {Component, OnInit, Input} from '@angular/core';
type editorAction = "add" | "edit";

@Component({
    selector: 'app-books-editor',
    templateUrl: './books-editor.component.html',
    styleUrls: ['./books-editor.component.scss']
})
export class BooksEditorComponent implements OnInit {
    @Input() public action: editorAction = "add";
    @Input() public author: string = "J. Rouling";
    @Input() public title: string = "Garry Potter";
    @Input() public description: string = "bla-bla";
    @Input() public status: boolean = false;

    public get fileTitle() {
        return this.action === "add" ? "select file upload" : "replace file";
    }

    constructor() {

    }

    ngOnInit() {
    }

}

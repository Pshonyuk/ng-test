import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../api.service';


@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    providers: [ApiService]
})
export class CreateComponent implements OnInit {
    static validationMessages = {
        'email': {
            'required': 'Field is required.',
            'pattern': 'Please enter an email address.',
            'duplicated': 'Email address is busy.'
        },
        'password': {
            'required': 'Field is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 16 characters long.'
        },
        'confirmPassword': {
            'required': 'Field is required.',
            'compare': 'Passwords does not match.'
        }
    };

    public userForm: FormGroup;
    public formErrors: {[key: string]: string};

    constructor(private _apiService: ApiService, private _router: Router) {
        this.formErrors = {};
    }

    public ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.userForm = new FormGroup({
            'email': new FormControl('helmer@ex.ua', [
                Validators.required,
                Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
            ]),
            'password': new FormControl('123456', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(16)
            ]),
            'confirmPassword': new FormControl('123456', this._confirmPasswordValidator())
        });

        this.userForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    private onValueChanged(data?: any): void {
        if (!this.userForm) return;
        const form = this.userForm,
            validationMessages = CreateComponent.validationMessages;

        for (const field in validationMessages) {
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    private onPost(data): void {
        if (!data || (data.error && data.error.type === 'unknown')) {
            this.userForm.reset();
            return;
        }

        if (data.error) {
            const {field, type} = data.error,
                messages = CreateComponent.validationMessages[field];

            if (messages && messages[type]) {
                this.formErrors[field] = messages[type];
            }
            return;
        }

        this._router.navigate(['']);
    }

    private onSubmit(): void {
        if (this.userForm && !this.userForm.invalid) {
            this._apiService.post("users", this.userForm.value)
                .subscribe(data => this.onPost(data));
        }
    }

    private onCancel(): void {
        this._router.navigate(['']);
    }

    private _confirmPasswordValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (!this.userForm) return null;
            const confirm: string = control.value,
                password: string = this.userForm.controls['password'].value;

            return password === confirm ? null : {'compare': {name}};
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private return_url: string;

  constructor(
    private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) {}

  async ngOnInit() {
    this.return_url = this.activatedRoute.snapshot.queryParams.returnUrl || '/tasks';
    
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
    
    await this.router.navigate([this.return_url]);
  }

  async onSubmit() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.loginForm.valid) {
      try {
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
      } catch(err) {
        console.log(err);
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}

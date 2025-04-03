import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HandlerService } from '../handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  userForm;

  constructor(
    private fb: FormBuilder,
    private handlerService: HandlerService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      userCount: [0, [Validators.required, Validators.min(1)]],
      groupSize: [0, [Validators.required, Validators.min(1)]],
    });
  }

  submitForm(): void {
    if (this.userForm.valid) {
      const userCount = this.userForm.value.userCount;
      const groupSize = this.userForm.value.groupSize;
      if (userCount == null) return;
      if (groupSize == null) return;
      this.handlerService.initData(userCount, groupSize);
      this.router.navigate(['rounds']);
      this.userForm.reset({ userCount: 0, groupSize: 0 });
    }
  }
}

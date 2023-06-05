import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-register-modal',
  templateUrl: './login-register-modal.component.html',
  styleUrls: ['./login-register-modal.component.scss'],
})
export class LoginRegisterModalComponent {
  constructor(public activeModal: NgbActiveModal) {}

  close() {
    this.activeModal.close();
  }
}

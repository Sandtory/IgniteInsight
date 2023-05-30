import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subscribe-modal',
  templateUrl: './subscribe-modal.component.html'
})
export class SubscribeModalComponent {
  constructor(public activeModal: NgbActiveModal) { }

  close() {
    this.activeModal.close();
  }
}

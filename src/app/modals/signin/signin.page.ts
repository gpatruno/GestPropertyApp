import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import Account from '../../models/Account.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  modalTitle: string;
  password: string = '';
  modelParam: Account = {
    User: {
      LastName: '',
      Name: '',
      Mail: '',
      Phone: ''
    }
  };

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.log(this.navParams);
    this.modalTitle = this.navParams.data.paramTitle;
  }

  async closeModal() {
    await this.modalController.dismiss({ modelParam: this.modelParam, password: this.password });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  isUserConnected: boolean;
  isOrgaConnected: boolean;
  constructor() { }

  ngOnInit() {
  }

  showHideUserForm() {
    this.isUserConnected = !this.isUserConnected;
  }

  showHideOrgaForm() {
    this.isOrgaConnected = !this.isOrgaConnected;
  }
}

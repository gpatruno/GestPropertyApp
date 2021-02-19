import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  date: string;
  type: 'string';
  showAddEvent: boolean;
  allEvents = [];
  dateRange: { from: string; to: string; };
  minDate = new Date().toISOString();
  newEvent = {
    title: '',
    desc: '',
    imageURL: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString()
  }
  constructor() { }

  ngOnInit() {
  }

  //Attributes    type      default       Description
  //color	        string	'primary'	    'primary', 'secondary', 'danger', 'light', 'dark'
  optionsRange: CalendarComponentOptions = {
    pickMode: 'range',
    color: 'danger',
    showMonthPicker: true,
    weekStart: 1,
    showToggleButtons: true
  };

  onChange($event: any) {
    this.dateRange = $event;
  }

  addEvent() {
    console.log('addEvent', this.newEvent);
    this.dateRange = {
      from: new Date(this.newEvent.startTime).toISOString(),
      to: new Date(this.newEvent.endTime).toISOString()
    }
    console.log(this.optionsRange);
    this.newEvent = {
      title: '',
      desc: '',
      imageURL: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    }
    this.showHideForm();
  }

  showHideForm() {
    this.showAddEvent = !this.showAddEvent;
  }

  showItem() {
    console.log('showItem');
    
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  state = {latestVal: 0}
  constructor() { }

  ngOnInit() {
  }

  receiveState($event) {
    this.state = $event
  }

}

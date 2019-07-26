import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-window',
  templateUrl: './button-window.component.html',
  styleUrls: ['./button-window.component.css']
})
export class ButtonWindowComponent implements OnInit {
  state = {
    firstVal: '0', // Stores the first value for the sum
    latestVal: '0', // Stores the second value for the sum
    operator: null, // Stores the operator for the sum
    latestButtonType: null, // To handle multi digit numbers
    latestButtonVal: null // To handle repeated = presses in a row
  };
  
  constructor() {
  }

  ngOnInit() {
  }

  changeState(btnValue){
    var latestVal = this.state.latestButtonVal;
    var latestBtnType = this.state.latestButtonType;

    switch(typeof(btnValue)) {
      case 'string':
          switch (btnValue){
            case 'equals':
              setTimeout(() => {
                switch(this.state.operator) {
                  case 'multiply': this.multiply(latestVal); break;
                  case 'divide': this.divide(latestVal); break;
                  case 'plus': this.plus(latestVal); break;
                  case 'minus': this.minus(latestVal); break;
                }
              }, 1);
              break;
            case 'clear':
              this.state.latestVal = this.state.firstVal;
              break;
            case 'clear_all':
              this.state.firstVal = '0';
              this.state.latestVal = '0';
              this.state.operator = null;
              break;
            case "point":
              if (latestBtnType === 'num'){
                console.log(this.state.latestVal, this.state.latestVal.includes('.'))
                if (!this.state.latestVal.includes('.')) {
                  var ans = this.state.latestVal + '.';
                  this.state.latestVal = ans;
                  this.state.latestButtonType = 'num';
                }
              }
              break;
            default:
              this.state.operator = btnValue;
              break;
            }
          setTimeout(()=>{
            this.state.latestButtonVal = btnValue
          },1)
          this.state.latestButtonType = 'op'
        break;

      case 'number':
        this.state.latestButtonType = 'num';
        this.state.latestButtonVal = btnValue;
        if (latestBtnType === 'num'|| latestVal === 0){
          var ans = this.state.latestVal.toString() + btnValue.toString()
          this.state.latestVal = ans;
          this.state.latestButtonType = 'num';
        } 
        else if (latestBtnType === 'op' && latestVal === 'point'){
          this.state.latestVal = this.state.latestVal + btnValue;
        }
        else {
            this.state.firstVal = this.state.latestVal;
            this.state.latestVal = btnValue.toString()
        }
        break;
    }
  
    this.sendMessage() // Sends state to the parent component
    setTimeout(() => {
      console.log(this.state);
    }, 1)
  }

  multiply(latestVal) {
    if (latestVal === "equals"){
      var ans = Number(this.state.latestVal) *
        (Number(this.state.latestVal) /
        Number(this.state.firstVal));
      this.state.firstVal = this.state.latestVal;
      this.state.latestVal = ans.toString();
    }
    else {
      var ans = (Number(this.state.latestVal) * Number(this.state.firstVal));
      this.state.latestVal = ans.toString();
    }
  }

  divide(latestVal) {
    if (latestVal === "equals"){ // Handles repeated = presses
      console.log('repeat');
      var ans = Number(this.state.latestVal) / Number(this.state.firstVal)
      this.state.latestVal = ans.toString();
    } else {
      var ans = Number(this.state.firstVal) / Number(this.state.latestVal);
      this.state.firstVal = this.state.latestVal;
      this.state.latestVal = ans.toString()
    }
  }

  plus(latestVal) {
    if (latestVal === "equals"){ // Handles repeated = presses
      var ans = Number(this.state.latestVal) + 
                (Number(this.state.latestVal) - 
                 Number(this.state.firstVal)
                )
                console.log(ans);
      this.state.firstVal = this.state.latestVal;
      this.state.latestVal = ans.toString();
    }
    else {
      var ans = Number(this.state.latestVal) + Number(this.state.firstVal);
      this.state.latestVal = ans.toString();
    }
  }

  minus(latestVal) {
    if (latestVal === "equals"){ // Handles repeated = presses
      var ans = Number(this.state.latestVal) - Number(this.state.firstVal);
      this.state.latestVal = ans.toString()
    } else {
      var ans = Number(this.state.firstVal) - Number(this.state.latestVal);
        this.state.firstVal = this.state.latestVal;
        this.state.latestVal = ans.toString();
    }
  }

  @Output() messageEvent = new EventEmitter<object>();
  sendMessage() {
    this.messageEvent.emit(this.state)
  }

}

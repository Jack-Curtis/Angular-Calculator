import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {
  @Input() screenValue: string;

  constructor() {}
  
  ngOnInit() {}

}

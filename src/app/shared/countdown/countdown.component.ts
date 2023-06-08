import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  @Input() value: any[]=null;
  @Input() startPositive: boolean;
  @Input() day: boolean = false;

  ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '0' + 0;
  hr: any = '0' + 0;
  daysLeft:any = '0' +0;
  running = false;
  startTimer: any;
  constructor() { }

  ngOnInit(): void {
    if (this.startPositive) {
      this.start();
    } else {
      if(this.value!=null)
      {
        this.startNegative(this.value[0], this.value[1], this.value[2], this.value[3]);
        this.daysLeft=this.value[4];
      }
    }
  }

  start(): void {
    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        this.ms++;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

        if (this.ms === 100) {
          this.sec++;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.ms = '0' + 0;
        }

        if (this.sec === 60) {
          this.min++;
          this.min = this.min > 10 ? '0' + this.min : this.min;
          this.sec = '0' + 0;
        }

        if (this.min === 60) {
          this.hr++;
          this.hr = this.hr < 10 ? '0' + this.hr : this.hr;
          this.min = '0' + 0;
        }
      }, 10);

    } else {
      this.stop();
    }
  }

  stop(): void {
    clearInterval(this.startTimer);
    this.running = false;
  }

  startNegative(hr: any, min: any, sec: any, ms: any): void {
    this.hr = hr;
    this.min = min;
    this.ms = ms;
    this.sec = sec;

    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        this.ms--;
        this.ms = this.ms < 10 ? '0' + this.ms : this.ms;

        if (this.ms == 0) {
          this.sec--;
          this.sec = this.sec < 10 ? '0' + this.sec : this.sec;
          this.ms = 99;
        }

        if (this.sec == 0) {
          this.min--;
          this.min = this.min < 10 ? '0' + this.min : this.min;
          this.sec = 59;
        }

        if (this.min == 0) {
          this.hr--;
          this.hr = this.hr < 10 ? '0' + this.hr : this.hr;
          this.min = 59;
        }
        // if(this.hr==-1){
        //   this.stop();
        // }
      }, 10);

    } else {
      this.stop();
    }

  }

  
}

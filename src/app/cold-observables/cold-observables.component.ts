
import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, timer, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.css']
})
export class ColdObservablesComponent implements OnInit {

  subscription1: Subscription;
  subscription2: Subscription;
  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
    this.s1 = 'Iniciando...';
    this.s2 = 'iniciando...';

    const myIntervalObservable = new Observable(
     (observer: Observer<any>) => {
       let i: number = 0;
       let id = setInterval(() => {
        i++;
        console.log('from observale:' , i);
        if (i == 10){
          observer.complete();
         } else if (i%2 == 0){
          observer.next(i);
         }
       }, 1000);
       return () => {
         clearInterval(id);
       };
     }
    );

    this.subscription1 =  myIntervalObservable.subscribe(
      (_n) => {this.n1 = _n},
      (error) => {this.s1 = 'error: ' + error},
      () => {this.s1 = 'completed'}
    );

    setInterval(()=>{
      this.subscription2 =  myIntervalObservable.subscribe(
        (_n) => {this.n2 = _n},
        (error) => {this.s2 = 'error: ' + error},
        () => {this.s2 = 'completed'}
      );
    }, 3000);


    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 11000);

  }

}


import { Component, OnInit } from '@angular/core';
import { Observable, Observer, interval, timer, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {

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
    const myFirstObservable = new Observable(
      (observer: Observer<number>) => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.next(4);
        observer.next(5);
        observer.error('erp');
        observer.complete();
      }
    );
    myFirstObservable.subscribe(
      (n: number) => console.log(n),
      (error) => console.error(error),
      () => console.log('completo') );

    /*
    const timerCount = interval(500);
    timerCount.subscribe(
      (n) => console.log(n)
    );
    console.log('after interval');
    */

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
    this.subscription2 =  myIntervalObservable.subscribe(
      (_n) => {this.n2 = _n},
      (error) => {this.s2 = 'error: ' + error},
      () => {this.s2 = 'completed'}
    );

    setTimeout(() => {
      this.subscription1.unsubscribe();
      this.subscription2.unsubscribe();
    }, 11000);

  }

}

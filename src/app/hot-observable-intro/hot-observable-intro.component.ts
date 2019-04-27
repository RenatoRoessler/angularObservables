import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable, fromEvent, Observer } from 'rxjs';
import { isProceduralRenderer } from '@angular/core/src/render3/interfaces/renderer';

@Component({
  selector: 'app-hot-observable-intro',
  templateUrl: './hot-observable-intro.component.html',
  styleUrls: ['./hot-observable-intro.component.css']
})
export class HotObservableIntroComponent implements OnInit {

  @ViewChild('myButton') button: ElementRef;

  n1: number = 0;
  n2: number = 0;
  s1: string = '';
  s2: string = '';

  constructor() { }

  ngOnInit() {
    const myBtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click' );

    myBtnClickObservable.subscribe((event) => console.log('button clicked 1'));
    myBtnClickObservable.subscribe((event) => console.log('button clicked 2'));

    class Producer {
      private myListeners = [];
      private n = 0;
      private id;

      addListener(l) {
        this.myListeners.push(l);
      }

      start() {
        this.id = setInterval(() => {
          this.n++;
          console.log('from producer: ' + this.n);
          for (let l of this.myListeners){
            l(this.n);
          }
        }, 1000);
      }
      stop() {
        clearInterval(this.id);
      }
    }

    let producer: Producer = new Producer();
    producer.start();
    setTimeout(
      () => {
        producer.addListener((n) => console.log('from lsitener 1', n));
        producer.addListener((n) => console.log('from lsitener 2', n));
      } , 4000
    );

    const myHotObservable = new Observable(
      (observer: Observer<number>) => {
        producer.addListener((n) => observer.next(n));
      }
    );

    myHotObservable.subscribe((n) => console.log('from subscriver 1', n));
    myHotObservable.subscribe((n) => console.log('from subscriver 2', n));


  }



}

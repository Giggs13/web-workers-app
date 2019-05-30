import { Component } from '@angular/core';

import isPrimeNumber from 'prime-number';
import primeNumberList from 'prime-number/list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'web-workers-app';
  isThreadDone = false;
  isWorkerDone = false;

  runWorker() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('./prime-calculations.worker', {type: 'module'});
      worker.onmessage = ({data}) => {
        console.log('From Web Worker:', data);
        this.isWorkerDone = true;
      };
      worker.postMessage({message: 'Hello!'});
    }
  }

  runThread() {
    const arePrimeList = primeNumberList.map(isPrimeNumber);
    console.log('From Javascript Thread', arePrimeList);
    this.isThreadDone = true;
  }
}

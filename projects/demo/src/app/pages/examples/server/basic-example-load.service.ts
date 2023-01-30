import { Injectable } from '@angular/core';

@Injectable()
export class BasicExampleLoadService {
  static dataSize = 500;

  // emulating request to the server
  getData(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.generateData());
      }, 2000);
    });
  }

  getNewExampleObj(n?: number) {
    n = typeof n !== 'undefined' ? n : Math.random() * 1000;
    return {
      id: n,
      name: `Jack London ${n}`,
      username: `jack_london_${n}`,
      email: `jack_london_${n}@example.com`
    };
  }

  protected generateData(): any[] {
    const data = [];
    for (let i = 0; i < BasicExampleLoadService.dataSize; i++) {
      data.push(this.getNewExampleObj(i));
    }
    return data;
  }
}

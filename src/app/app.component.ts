import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('chatscroll', { static: false }) chatscroll: ElementRef;

  chats = [];
  isLoading = false;

  ngOnInit() {
    this.addChats(50).then(() => {
      setTimeout(() => {
        // Scroll to bottom first time
        this.chatscroll.nativeElement.scrollTop = this.chatscroll.nativeElement.scrollHeight;
      }, 1);
    });
  }

  addChats(c: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const oLength = this.chats.length;
        for (let k = oLength; k < oLength + c; k++) {
          this.chats.unshift(k + ' World');
        }
        resolve('Loaded');
      }, 1000);
    });
  }

  onScroll($event) {

    const elem: HTMLElement = $event.srcElement;
    const oScrollTop = elem.scrollTop;

    if (this.isLoading) { return; }

    if (elem.scrollTop < 50) {
      this.isLoading = true;
      this.addChats(50).then(() => {
        this.isLoading = false;
        elem.scrollTop = oScrollTop;
      });
    }
  }
}

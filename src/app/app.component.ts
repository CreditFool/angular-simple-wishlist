import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WishItem } from '../shared/model/wishItem';
import { EventService } from '../shared/service/EventService';
import { WishService } from './wish.service';
import { WishModule } from './wish/wish.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, WishModule],
  template: `{{ wish }}`,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(events: EventService, private wishService: WishService) {
    events.listen('removeWish', (wish: any) => {
      const idx = this.items.indexOf(wish);
      this.items.splice(idx, 1);
    });
  }

  ngOnInit(): void {
    this.wishService.getWishes().subscribe(
      (data: any) => {
        this.items = data;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }

  items: WishItem[] = [];

  filter: any;
}

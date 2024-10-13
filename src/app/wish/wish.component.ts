import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WishItem } from '../../shared/model/wishItem';
import { EventService } from '../../shared/service/EventService';
import { WishService } from './wish.service';
import { AddWishFormComponent } from './add-wish-form/add-wish-form.component';
import { WishFilterComponent } from './wish-filter/wish-filter.component';
import { WishListComponent } from './wish-list/wish-list.component';

@Component({
  selector: 'app-wish',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    AddWishFormComponent,
    WishFilterComponent,
    WishListComponent,
  ],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css',
})
export class WishComponent implements OnInit {
  items: WishItem[] = [];
  filter: any;

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
}

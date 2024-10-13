import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WishItem } from '../shared/model/wishItem';
import { WishListComponent } from './wish-list/wish-list.component';
import { AddWishFormComponent } from './add-wish-form/add-wish-form.component';
import { WishFilterComponent } from './wish-filter/wish-filter.component';
import { EventService } from '../shared/service/EventService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    WishListComponent,
    AddWishFormComponent,
    WishFilterComponent,
  ],
  template: `{{ wish }}`,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'wishlist';

  items: WishItem[] = [
    new WishItem('Album HHW'),
    new WishItem('Nesoberi Kokoron', true),
    new WishItem('Jake Kokoro'),
  ];

  constructor(events: EventService) {
    events.listen('removeWish', (wish: any) => {
      const idx = this.items.indexOf(wish);
      this.items.splice(idx, 1);
    });
  }

  filter: any;
}

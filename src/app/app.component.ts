import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WishItem } from '../shared/model/wishItem';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
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

  newWishText = '';
  addNewWish() {
    if (this.newWishText) {
      this.items.push(new WishItem(this.newWishText));
      this.newWishText = '';
    }
  }

  listFilter: String = '0';
  get visibleItems(): WishItem[] {
    switch (this.listFilter) {
      case '1':
        return this.items.filter((item) => !item.isComplete);

      case '2':
        return this.items.filter((item) => item.isComplete);

      default:
        return this.items;
    }
  }

  toggleItem(item: WishItem) {
    item.isComplete = !item.isComplete;
    console.log(item);
  }
}

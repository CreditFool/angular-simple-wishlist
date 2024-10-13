import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WishItem } from '../../shared/model/wishItem';

@Component({
  selector: 'app-wish-list-item',
  standalone: true,
  imports: [],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css',
})
export class WishListItemComponent {
  @Input() wishText!: string;

  @Input() fullfilled!: boolean;
  @Output() fullfilledChange = new EventEmitter<boolean>();

  toggleFullfilled() {
    this.fullfilled = !this.fullfilled;
    this.fullfilledChange.emit(this.fullfilled);
  }
}

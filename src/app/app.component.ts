import {Component} from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *', [
        group([
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateX(-100vw)'
              }),
              animate(
                '1.35s',
                style({opacity: 1, transform: 'translateX(0vw)'})
              ),
              animateChild()
            ],
            {optional: true}
          ),
          query(
            ':leave',
            [animate('0.95s', style({
              opacity: 0,
              transform: 'translateX(-100vw)'
            })), animateChild()],

            {optional: true}
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'app';

  getPage(outlet) {
    return outlet.activatedRouteData['page'] || 'one';
  }
}

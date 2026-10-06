import { BunnyIcon, CarrotIcon, FlowerIcon, HeartIcon, StarIcon } from '../art/icons';
import './IconStrip.css';

const ICONS = [
  { title: 'Carrot', Icon: CarrotIcon },
  { title: 'Flower', Icon: FlowerIcon },
  { title: 'Bunny', Icon: BunnyIcon },
  { title: 'Heart', Icon: HeartIcon },
  { title: 'Star', Icon: StarIcon },
];

/** A dashed "hop trail" connecting a row of themed icons. */
export function IconStrip() {
  return (
    <div className="icon-strip">
      <div className="icon-strip__route">
        <div className="icon-strip__line" />
        {ICONS.map(({ title, Icon }) => (
          <div key={title} className="icon-strip__icon" title={title}>
            <Icon size={30} />
          </div>
        ))}
      </div>
    </div>
  );
}

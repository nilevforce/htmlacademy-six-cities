import { memo, ReactElement, SyntheticEvent } from 'react';
import classNames from 'classnames';

interface LocationProps {
  id: string;
  title: string;
  isActive: boolean;
  onClickLocation: (evt: SyntheticEvent<HTMLElement>) => void;
}

function Location (props: LocationProps): ReactElement {
  const {
    id,
    title,
    isActive,
    onClickLocation
  } = props;
  return (
    <li
      className="locations__item"
      data-js-id={id}
      onClick={onClickLocation}
    >
      <a
        className={classNames(
          'locations__item-link',
          'tabs__item',
          isActive && 'tabs__item--active'
        )}
        href='#'
      >
        <span>{title}</span>
      </a>
    </li>
  );
}

export default memo(Location);

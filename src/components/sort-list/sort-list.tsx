import {
  MutableRefObject,
  ReactElement, SyntheticEvent, useEffect,
  useRef
} from 'react';
import classNames from 'classnames';
import { SortType } from '../../constants.ts';

interface SortListProps {
  sortTypeList: SortType[];
  currentSortType: SortType;
  onSortTypeChange: (selectedSortType: SortType) => void;
}

function SortList (props: SortListProps): ReactElement {
  const {
    sortTypeList,
    currentSortType,
    onSortTypeChange
  } = props;

  const refSortList: MutableRefObject<HTMLUListElement | null> = useRef<HTMLUListElement>(null);

  const toggleSortList = () => {
    refSortList.current?.classList.toggle('places__options--opened');
  };

  const handleSortListClick = (evt: SyntheticEvent<HTMLElement>) => {
    evt.stopPropagation();
    toggleSortList();
  };

  const handleItemClick = (evt: SyntheticEvent<HTMLElement>, selectedType: SortType) => {
    evt.stopPropagation();

    if (selectedType === currentSortType) {
      toggleSortList();
      return;
    }

    onSortTypeChange(selectedType);
    toggleSortList();
  };

  const handleDocumentElementClick = () => {
    refSortList.current?.classList.remove('places__options--opened');
  };

  const handleKeyDown = (evt: KeyboardEvent) => {
    if (evt.key !== 'Escape') {
      return;
    }

    refSortList.current?.classList.remove('places__options--opened');
  };

  useEffect(() => {
    const documentElement = document.documentElement;

    documentElement.addEventListener('click', handleDocumentElementClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      documentElement.removeEventListener('click', handleDocumentElementClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
    >
      <span className="places__sorting-caption">
        Sort by
      </span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortListClick}
      >
        {currentSortType}
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
        >
          <use href="#icon-arrow-select" />
        </svg>
      </span>

      <ul
        ref={refSortList}
        className="places__options places__options--custom"
      >
        {
          sortTypeList.map((sortType) => (
            <li
              key={sortType}
              className={
                classNames(
                  'places__option',
                  sortType === currentSortType && 'places__option--active'
                )
              }
              tabIndex={0}
              onClick={(evt) => handleItemClick(evt, sortType)}
            >
              {sortType}
            </li>
          ))
        }
      </ul>
    </form>
  );
}

export default SortList;

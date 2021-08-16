import * as React from 'react';
import PanelContext from '../PanelContext';
import { useEffect, useState } from 'react';
import moment from 'moment';

const HIDDEN_STYLE: React.CSSProperties = {
  visibility: 'hidden',
};

export type HeaderProps<DateType> = {
  viewDate?: DateType;
  prefixCls: string;

  // Icons
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  superPrevIcon?: React.ReactNode;
  superNextIcon?: React.ReactNode;

  /** Last one step */
  onPrev?: () => void;
  /** Next one step */
  onNext?: () => void;
  /** Last multiple steps */
  onSuperPrev?: () => void;
  /** Next multiple steps */
  onSuperNext?: () => void;

  children?: React.ReactNode;
};

function Header<DateType>({
  prefixCls,
  superPrevIcon = '\u00AB',
  superNextIcon = '\u00BB',
  onSuperPrev,
  onSuperNext,
  onPrev,
  onNext,
  children,
  viewDate,
}: HeaderProps<DateType>) {
  const { hideNextBtn, hidePrevBtn } = React.useContext(PanelContext);
  const [isPrevVisible, setIsPrevVisible] = useState(false);
  const [isNextVisible, setIsNextVisible] = useState(false);
  useEffect(() => {
    setIsPrevVisible(moment(viewDate) > moment().subtract(3, 'month'));
    setIsNextVisible(moment(viewDate).month() < moment().month());
  }, [viewDate]);
  return (
    <div className={prefixCls}>
      {onSuperPrev && (
        <button
          type="button"
          onClick={onSuperPrev}
          tabIndex={-1}
          className={`${prefixCls}-super-prev-btn`}
          style={hidePrevBtn ? HIDDEN_STYLE : {}}
        >
          {superPrevIcon}
        </button>
      )}
      {onPrev && (
        <button
          type="button"
          onClick={onPrev}
          tabIndex={-1}
          className={`${prefixCls}-prev-btn`}
          style={hidePrevBtn || !isPrevVisible ? HIDDEN_STYLE : {}}
        >
          {superPrevIcon}
        </button>
      )}
      <div className={`${prefixCls}-view`}>{children}</div>
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          tabIndex={-1}
          className={`${prefixCls}-next-btn`}
          style={hideNextBtn || !isNextVisible ? HIDDEN_STYLE : {}}
        >
          {superNextIcon}
        </button>
      )}
      {onSuperNext && (
        <button
          type="button"
          onClick={onSuperNext}
          tabIndex={-1}
          className={`${prefixCls}-super-next-btn`}
          style={hideNextBtn ? HIDDEN_STYLE : {}}
        >
          {superNextIcon}
        </button>
      )}
    </div>
  );
}

export default Header;

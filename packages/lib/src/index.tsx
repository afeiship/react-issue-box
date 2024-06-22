// import noop from '@jswork/noop';
import cx from 'classnames';
import React, { ReactNode, Component, HTMLAttributes } from 'react';

const CLASS_NAME = 'react-issue-box';
// const uuid = () => Math.random().toString(36).substring(2, 9);
export type ReactIssueBoxProps = {
  /**
   * The extended className for component.
   * @default ''
   */
  className?: string;
  /**
   * The content className for component.
   */
  contentClassName?: string;
  /**
   * The hover effect for component.
   * @default false
   */
  hoverAble?: boolean;
  /**
   * The shadow effect for component.
   * @default false
   */
  shadowAble?: boolean;
  /**
   * The children element.
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default class ReactIssueBox extends Component<ReactIssueBoxProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    hoverAble: false,
    shadowAble: false
  };

  render() {
    const { className, contentClassName, children, hoverAble, shadowAble, ...rest } = this.props;
    return (
      <section data-component={CLASS_NAME} data-hoverable={hoverAble} data-shadowable={shadowAble}
               className={cx(CLASS_NAME, className)} {...rest}>
        <div className={cx(`${CLASS_NAME}__inner`)}>
          <div className={cx(`${CLASS_NAME}__content`, contentClassName)}>
            {children}
          </div>
        </div>
      </section>
    );
  }
}

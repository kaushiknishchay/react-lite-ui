import React from 'react';
import PropTyes from 'prop-types';
import classnames from 'classnames';
import { themr } from 'react-css-themr';
import defaultTheme from './theme.scss';

class Navbar extends React.Component {
  renderLeftContent = () => {
    const { title, theme } = this.props;

    return (
      title && (
        <div className={theme.leftContent}>
          {
            typeof title === 'string'
              ? <span className={theme.title}>{title}</span>
              : title
          }
        </div>
      )
    );
  }

  renderDesktopView = () => {
    const { children } = this.props;

    return (
      <div className="navbarMenu">
        {children}
      </div>
    );
  }

  renderMobileView = () => {
    const { children } = this.props;

    return (
      <div className="navbarMobileMenu">
        {children}
        <span className="icon-menu" />
      </div>
    );
  }

  renderRightContent = () => {
    const { theme } = this.props;

    return (
      <div className={theme.rightContent}>
        {this.renderDesktopView()}
        {this.renderMobileView()}
      </div>
    );
  }

  render() {
    const {
      theme,
      position,
      color,
      title,
      leftIcon,
      rightIcon,
      onLeftIconClick,
      onRightIconClick,
      flat,
      children,
      className,
      ...other
    } = this.props;

    const classes = classnames(
      className,
      theme.navbarWrapper,
      theme[flat ? 'flat' : ''],
      theme[`${position}Position`],
      theme[`${color}Color`],
    );

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return (
      <div className={classes} {...other}>
        <div className={theme.innerWrapper}>
          {leftIcon && (
            <div className={theme.leftIcon} onClick={onLeftIconClick}>
              {React.isValidElement(leftIcon) ? leftIcon : <img src={leftIcon} alt="navbar-left-logo" />}
            </div>)
          }
          <div className={theme.navbarContent}>
            {this.renderLeftContent()}
            {this.renderRightContent()}
          </div>
          {rightIcon && (
            <div className={theme.rightIcon} onClick={onRightIconClick}>
              {React.isValidElement(rightIcon) ? rightIcon : <img src={rightIcon} alt="navbar-right-logo" />}
            </div>)
          }
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

Navbar.propTypes = {
  position: PropTyes.oneOf(['fixed', 'absolute', 'sticky', 'static', 'relative']),
  color: PropTyes.string,
  className: PropTyes.string,
  theme: PropTyes.oneOfType([PropTyes.object]),
  children: PropTyes.node,
  title: PropTyes.oneOfType([PropTyes.string, PropTyes.node]),
  leftIcon: PropTyes.node,
  rightIcon: PropTyes.node,
  onLeftIconClick: PropTyes.func,
  onRightIconClick: PropTyes.func,
  flat: PropTyes.bool,
};

Navbar.defaultProps = {
  position: 'static',
  color: 'default',
  className: '',
  theme: defaultTheme,
  children: null,
  title: null,
  leftIcon: null,
  rightIcon: null,
  onLeftIconClick: () => { },
  onRightIconClick: () => { },
  flat: false,
};

export default themr('CBNavbar', defaultTheme)(Navbar);

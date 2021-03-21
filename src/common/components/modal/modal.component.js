import React, { memo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';

import './modal.component.scss';

const MemoizedModal = ({ children, title, isOpen, handleClose }) => {
  if (window && window.innerWidth > 720) {
    const bodyElement = document.getElementById('body');

    if (isOpen) {
      if (bodyElement.scrollHeight > window.innerHeight) {
        bodyElement.classList.add('block-scroll');
      }
    } else {
      if (bodyElement.classList.contains('block-scroll')) {
        setTimeout(() => bodyElement.classList.remove('block-scroll'), 300);
      }
    }
  }

  return (
    <Fragment>
      <div className={`show-up ${isOpen ? 'show-up--active' : ''}`}>
        <div
          onClick={handleClose}
          className={`show-up__overlay ${
            isOpen ? 'show-up__overlay--active' : ''
          }`}
        />
        <div className="show-up__modal">
          <div className="show-up__header">
            <h2 className="show-up__title">{title}</h2>
            <div onClick={handleClose} className="show-up__close">
              <BsX fontSize="34" />
            </div>
          </div>
          <div className="show-up__content">{children}</div>
        </div>
      </div>
    </Fragment>
  );
};

MemoizedModal.propTypes = {
  children: PropTypes.element.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
};

export const Modal = memo(MemoizedModal);

const MemoizedModalOpenButton = (props) => {
  return (
    <button {...props} className="show-up__button cursor--pointer">
      {props.children}
    </button>
  );
};

MemoizedModalOpenButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export const ModalOpenButton = memo(MemoizedModalOpenButton);

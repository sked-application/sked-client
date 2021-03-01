import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BsX } from "react-icons/bs";

import './modal.component.scss';

const MemoizedShowUp = ({ children, title, isOpen, handleClose }) => {
	if (window && window.innerWidth > 720) {
		const bodyElement = document.getElementById('body');

		if (isOpen) {
			if (bodyElement.scrollHeight > window.innerHeight) {
				bodyElement.classList.add('block-scroll')
			}
		} else {
			if (bodyElement.classList.contains('block-scroll')) {
				setTimeout(() => bodyElement.classList.remove('block-scroll'), 300);
			}
		}
	}

    return (
		<>
			<div
				className={`show-up ${isOpen ? 'show-up--active' : ''}`}
			>
				<div className={`show-up__overlay ${isOpen ? 'show-up__overlay--active' : ''}`}
					onClick={handleClose}
				></div>
				<div className="show-up__modal">
					<div className="show-up__header">
						<h2 className="show-up__title">{title}</h2>
						<div onClick={handleClose} className="show-up__close">
							<BsX fontSize="34"/>
						</div>
					</div>
					<div className="show-up__content">
						{children}
					</div>
				</div>
			</div>
		</>
    );
};

MemoizedShowUp.propTypes = {
    children: PropTypes.element.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	isOpen: PropTypes.bool,
};

export const ShowUp = memo(MemoizedShowUp);

const MemoizedShowUpButton = (props) => {
    return (
        <button {...props} className="show-up__button cursor--pointer">
			{props.children}
		</button>
    );
};

MemoizedShowUpButton.propTypes = {
	children: PropTypes.element.isRequired
};

export const ShowUpButton = memo(MemoizedShowUpButton);

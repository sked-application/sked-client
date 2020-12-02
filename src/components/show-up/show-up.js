import React from 'react';
import PropTypes from 'prop-types';
import { BsX } from "react-icons/bs";

export const ShowUp = ({ children, title, isOpen, handleClose }) => {
    return (
		<>
			<div
				className={`show-up__overlay ${isOpen ? 'show-up__overlay--active' : ''}`}
				onClick={handleClose}
			></div>
			<div className={`show-up ${isOpen ? 'show-up--active': ''}`}>
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
		</>
    );
};

ShowUp.propTypes = {
    children: PropTypes.element.isRequired,
	handleClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	isOpen: PropTypes.bool,
};

export const ShowUpButton = (props) => {
    return (
        <button {...props} className="show-up__button cursor--pointer">
			{props.children}
		</button>
    );
};

ShowUpButton.propTypes = {
	children: PropTypes.element.isRequired
};

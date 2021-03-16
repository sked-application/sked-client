import React from 'react';
import PropTypes from 'prop-types';

const TimegridWeekDay = ({
	label,
	timegrid,
	handleOpen,
}) => {
    return (
        <li className="card card--outline">
            <div className="card__header">
				<h2 className="card__title color flexbox flexbox--center">{label}</h2>
				<strong
					onClick={handleOpen}
					className="card__subtitle color--purple cursor--pointer">
					Gerenciar
				</strong>
            </div>
            {timegrid.length ? (
                <div className="timegrid-slot__box flexbox flexbox--wrap">
                    {timegrid.map((item, index) => (
                        <div
                            key={index}
                            className="timegrid-slot__item flexbox m-b-10 p-l-5 p-r-5">
                            <div className="flexbox__item badge badge--light badge--outline cursor--pointer text--center">
								<span>{item.start.slice(0, 5)} às {item.end.slice(0, 5)}</span>
							</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-b-15">
					<span>Sem grade de horário pra este dia.</span>
				</div>
            )}
        </li>
    );
};

TimegridWeekDay.propTypes = {
    label: PropTypes.string,
    timegrid: PropTypes.array,
    handleOpen: PropTypes.func,
};

export default TimegridWeekDay;

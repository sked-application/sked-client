import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineLeft } from 'react-icons/ai';
import logoSvg from '../../../common/assets/svg/logo.svg';
import './wizard-header.component.scss';

const WizardHeader = ({ allowBackButton, wizardInstance }) => {
  return (
    <div className="wizard-header">
      {allowBackButton && (
        <div
          onClick={wizardInstance.previousStep}
          className="wizard-header__previous"
        >
          <span className="wizard-header__previous__icon">
            <AiOutlineLeft />
          </span>
          <span className="wizard-header__previous__label">Anterior</span>
        </div>
      )}
      <span className="header__logo">
        <img src={logoSvg} alt="Logo Sked App" />
      </span>
    </div>
  );
};

WizardHeader.propTypes = {
  allowBackButton: PropTypes.bool,
  wizardInstance: PropTypes.object,
};

WizardHeader.displayName = 'WizardHeader';
export default WizardHeader;

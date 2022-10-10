import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';

const WizardStep = ({ children }) => {
  return (
    <Transition
      appear
      show
      enter="transition-opacity duration-700 ease-in-out"
      enterFrom="opacity-25"
      enterTo="opacity-100"
      leave="transition-opacity duration-700 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-25"
    >
      {children}
    </Transition>
  );
};

WizardStep.propTypes = {
  children: PropTypes.element,
  touched: PropTypes.bool,
  error: PropTypes.object,
};

WizardStep.displayName = 'AnimatedStep';
export default WizardStep;

import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import { useWizard } from 'react-use-wizard';
import { AiOutlineLeft } from 'react-icons/ai';
import logoSvg from '../../../common/assets/svg/logo.svg';

const WizardHeader = ({ allowBackOnLastStep }) => {
  const { previousStep, isFirstStep, isLastStep } = useWizard();
  const shouldHidePreviousStep =
    isFirstStep || (isLastStep && !allowBackOnLastStep);

  return (
    <div className="container mx-auto p-4 max-w-screen-lg">
      <div className="grid grid-cols-3">
        <div className="flex items-center">
          {!shouldHidePreviousStep && (
            <Transition
              appear
              show
              enter="transition-opacity duration-700 ease-in-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-700 ease-in-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <a
                onClick={() => previousStep()}
                className="text-indigo-500 cursor-pointer"
              >
                <span className="flex items-center">
                  <AiOutlineLeft size={14} />
                  <span className="text-xs font-semibold">Anterior</span>
                </span>
              </a>
            </Transition>
          )}
        </div>
        <div className="flex items-center justify-center">
          <img src={logoSvg} alt="Logo Sked App" />
        </div>
      </div>
    </div>
  );
};

WizardHeader.propTypes = {
  allowBackOnLastStep: PropTypes.bool,
};

WizardHeader.displayName = 'WizardHeader';
export default WizardHeader;

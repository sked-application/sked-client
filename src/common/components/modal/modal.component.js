import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BsX } from 'react-icons/bs';
import { Dialog, Transition } from '@headlessui/react';

const MemoizedModal = ({ isOpen, handleClose, title, children }) => {
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              className="w-full max-w-md"
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="transform overflow-hidden rounded-xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 mr-4 mt-2"
                  >
                    {title}
                  </Dialog.Title>
                  <BsX
                    fontSize="34"
                    onClick={handleClose}
                    className="cursor-pointer"
                  />
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

MemoizedModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export const Modal = memo(MemoizedModal);

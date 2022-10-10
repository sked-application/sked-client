export const buildObjectActions = (actions = []) => {
  const objectActions = actions.reduce((accObject, action) => {
    return { ...accObject, [action]: action };
  }, {});

  return objectActions;
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

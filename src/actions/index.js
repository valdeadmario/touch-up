
const targetsReload = (newTargets) => {
  return {
    type: 'TARGETS_RELOAD',
    payload: newTargets
  };
};

export {
  targetsReload
}
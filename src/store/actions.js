export const actions = {
  SAVE: 'SAVE',
  LOADED: 'LOADED'
}

export const save = pages => ({
  type: actions.SAVE,
  payload: pages
});

export const loaded = () => ({
  type: actions.LOADED
});
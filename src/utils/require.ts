interface RequireSomething {
  (candidate: any): void | never;
}

export const requireActionType: RequireSomething = (candidate) => {
  if (typeof candidate !== 'string') throw new Error('Action Type must be a string!');
  if (candidate.trim().length === 0) throw new Error('Action Type cannot be an empty string!');
};

export const requirePayloadFunction: RequireSomething = (candidate) => {
  if (typeof candidate !== 'function') throw new Error('You must provide payload function!');
};

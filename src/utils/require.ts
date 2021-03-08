interface RequireSomething {
  (candidate: any): void | never;
}

export const requireActionType: RequireSomething = (candidate) => {
  if (typeof candidate !== 'string') throw new Error('Action Type must be a string');
  if (candidate.trim().length === 0) throw new Error('Action Type cannot be an empty string');
};

export const requirePayloadFunction: RequireSomething = (candidate) => {
  if (typeof candidate !== 'function') throw new Error('You must provide payload function');
};

export const requireSteps: RequireSomething = (candidate) => {
  if (Array.isArray(candidate)) {
    if (candidate.length === 0) throw new Error('You must provide non empty list of steps');
    candidate.forEach((step) => {
      if (typeof step !== 'string') throw new Error('All of steps must be a string');
      if (step.trim().length === 0) throw new Error('Steps cannot be an empty string');
    });
  } else {
    throw new Error('You must provide list of steps or keep steps default');
  }
};

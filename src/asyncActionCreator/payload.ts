import { BasicPayloadInjector } from '../types';

interface Payload {
  <ActionPayload>(): BasicPayloadInjector<ActionPayload>;
}

export const payload: Payload = () => {
  return (payload) => payload;
};

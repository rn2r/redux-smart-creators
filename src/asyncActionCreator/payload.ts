import { BasicPayloadFunction } from '../types/common';

interface Payload {
  <ActionPayload>(): BasicPayloadFunction<ActionPayload>;
}

export const payload: Payload = () => {
  return (payload) => payload;
};

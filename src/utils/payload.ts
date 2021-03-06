import { BasicPayloadFunction } from '../types/common';

interface Payload {
  <ActionPayload>(): BasicPayloadFunction<ActionPayload>;
}

export const payload: Payload = () => (actionPayload) => actionPayload;

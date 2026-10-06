import { useState, type FormEvent } from 'react';
import { EVENT } from '../config/event';
import { rsvpService } from '../services';
import type { RsvpFormValues } from '../types/rsvp';
import { validateRsvp } from '../utils/validation';

const INITIAL_VALUES: RsvpFormValues = {
  name: '',
  email: '',
  attending: '',
  guests: '1',
  children: '0',
  message: '',
  website: '',
};

type Status = 'idle' | 'submitting' | 'success';

/** All RSVP form state and behaviour, so the component only has to render. */
export function useRsvpForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const setField = <K extends keyof RsvpFormValues>(field: K, value: RsvpFormValues[K]) =>
    setValues((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    const result = validateRsvp(values, EVENT.maxGuests, EVENT.maxChildren);
    if (!result.ok) {
      setError(result.error);
      return;
    }

    setStatus('submitting');
    try {
      await rsvpService.submit(result.submission);
      setStatus('success');
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  return {
    values,
    setField,
    error,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    isAttending: values.attending === 'Yes',
    handleSubmit,
  };
}

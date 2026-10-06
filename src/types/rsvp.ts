export type Attending = 'Yes' | 'No';

/** What the form collects. Fields are strings because they come straight from inputs. */
export interface RsvpFormValues {
  name: string;
  email: string;
  attending: Attending | '';
  guests: string;
  message: string;
  /** Honeypot: hidden from people, so only bots fill it in. */
  website: string;
}

/** The validated payload sent to the data store. This is the backend contract. */
export interface RsvpSubmission {
  name: string;
  email: string;
  attending: Attending;
  /** 0 when not attending. */
  guests: number;
  message: string;
  /** Honeypot value (empty for real people); the backend discards RSVPs where it's filled. */
  website: string;
}

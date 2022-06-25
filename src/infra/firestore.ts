import { Firestore } from '@google-cloud/firestore';

export const db = new Firestore({
  projectId: process.env['GCP_PROJECT_ID'] as string,
  keyFilename: process.env['GCP_SERVICE_ACCOUNT_FILE_URL'] as string,
});

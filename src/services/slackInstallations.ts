import { db } from '../infra/firestore';
import type { WriteResult } from '@google-cloud/firestore';
import type { Installation } from '@slack/bolt';

const COLLECTION_NAME = 'slackInstallations';

export const storeInstallation = async (id: string, installation: Installation) => {
  const docRef = db.collection(COLLECTION_NAME).doc(id);
  return await docRef.set(installation);
};

export const getInstallation = async (id: string): Promise<Installation> => {
  const docRef = db.collection(COLLECTION_NAME).doc(id);
  const doc = await docRef.get();
  return doc.data() as Installation;
};

export const deleteInstallation = async (id: string): Promise<WriteResult> => {
  const docRef = db.collection(COLLECTION_NAME).doc(id);

  return await docRef.delete();
};

import { S3Handler, S3Event } from 'aws-lambda';

export const handler: S3Handler = async (event: S3Event) => {
  console.log('---- Running s3 trigger -----');
  for (const record of event.Records) {
    const bucket = record.s3.bucket.name;
    const key = record.s3.object.key;

    console.log(`New file '${key}' uploaded in bucket '${bucket}'.`);
  }
  return;
};

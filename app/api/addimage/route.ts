import { NextResponse } from 'next/server';
import { parseFormData } from '../../../lib/formidable';
import fs from 'fs';

export async function POST(request) {
  try {
    const { files } = await parseFormData(request);
    const file = files.file[0];
    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;

    // Read the file content
    const fileBuffer = await fs.promises.readFile(file.filepath);

    const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: fileBuffer.toString('base64') // Convert file buffer to base64
            },
            features: [
              {
                type: 'LABEL_DETECTION'
              }
            ]
          }
        ]
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

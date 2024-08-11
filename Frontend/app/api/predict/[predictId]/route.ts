import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const callPythonScript = async(imageUrl : string) => {
    const hi  = await axios.post('http://localhost:8080/api/predict_image', {image : imageUrl});
    console.log(hi.data.last_emotion)
    return hi.data.last_emotion
  };

export async function POST(req: NextRequest) {
  try {
    // Parse the request URL to extract predictId
    const { pathname } = new URL(req.url);
    const predictId = pathname.split('/').pop();

    if (!predictId) {
      return NextResponse.json({ error: 'predictId is required' }, { status: 400 });
    }

    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ error: 'Image data is required' }, { status: 400 });
    }

    
    const response = await callPythonScript(image)
    //try{
    //    const response = await callPythonScript(image);
    //    return NextResponse.json({response});
    //}catch(err) {
    //    return NextResponse.json({ error: 'Python script error' }, { status: 500 });
    //}
    return NextResponse.json({message : response})
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

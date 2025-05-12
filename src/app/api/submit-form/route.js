export async function POST(request) {
    console.log('API route called with method: POST');
    
    let data;
    try {
      data = await request.json();
      console.log('Request data:', data);
    } catch (parseError) {
      console.error('Failed to parse request JSON:', parseError);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Invalid JSON in request body',
        details: parseError.message 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzEO7QDhTbR8UZvB8mPhqai_VBpv4XubS_GuE1D1T7o6MMiZ55lrXKFXIfiCQSDkZiV/exec';
    
    console.log('Preparing to send data to Google Script');
    
    try {
      console.log('Sending request to Google Script URL:', scriptURL);
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Google Script response status:', response.status);
      
      // Get detailed response information
      const responseText = await response.text();
      console.log('Google Script response body:', responseText);
      
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Parsed response data:', responseData);
      } catch (parseError) {
        console.error('Could not parse response as JSON:', parseError);
      }
      
      if (response.ok) {
        console.log('Success response being sent back to client');
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        console.error('Error response from Google Script');
        return new Response(JSON.stringify({
          success: false,
          statusCode: response.status,
          responseText: responseText,
          responseData: responseData || null
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } catch (error) {
      console.error('Error details:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      return new Response(JSON.stringify({
        success: false,
        error: error.message,
        errorName: error.name,
        errorStack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
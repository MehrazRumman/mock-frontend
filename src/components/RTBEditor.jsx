import React, { useState } from 'react';


import axios from 'axios';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  TextareaAutosize,
  Container,
  Grid,
  Box,
  Alert,
  TextField
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%',
  minHeight: '400px',
  fontFamily: 'monospace',
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  '&:focus': {
    outline: 'none',
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const templates = [
  {
    name: 'Video Ad Template',
    data: {
      id: "bid-req-123",
      imp: [{
        id: "1",
        test: 1,
        video: {
          mimes: ["video/mp4"],
          minduration: 5,
          maxduration: 30,
          protocols: [2, 3, 5, 6],
          w: 640,
          h: 360
        },
        bidfloor: 2.0,
        bidfloorcur: "USD"
      }],
      app: {
        id: "app123",
        name: "My App",
        bundle: "com.example.app",
        domain: "example.com",
        ver: "1.0"
      },
      user: {
        id: "user123",
       
        gender: "M",
        
        customdata: "user_custom_data"
      },
      device: {
        ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)",
        geo: {
          lat: 37.7749,
          lon: -122.4194,
          country: "USA",
          city: "San Francisco"
        },
        ip: "192.168.1.1",
        devicetype: 1,
        make: "Apple",
        model: "iPhone 12",
        os: "iOS",
        osv: "14.0",
        language: "en"
      }
    }
  },
  {
    name: 'Interactive Banner Template',
    data: {
      id: "bid-req-123",
      test:0,
      imp: [{
        id: 1,
        banner: {
          w: 300,
          h: 250
        },
        bidfloor: 1.0,
        bidfloorcur: "USD"
      }],
      app: {
        id: "app123",
        name: "My App"
      },
      user: {
        id: "user456",
        buyeruid: "buyer-user-456",
       
      
        customdata: "user_custom_data"
      },
      device: {
        ua: "Mozilla/5.0 (Android 10; Mobile;)",
        geo: {
          lat: 40.7128,
          lon: -74.0060,
          country: "USA", 
          city: "New York"
        },
        ip: "192.168.1.2",
        devicetype: 1,
        make: "Samsung",
        model: "Galaxy S20",
        os: "Android",
        osv: "10.0",
        language: "en"
      }
    }
  },
  {
    name: 'Regular Banner Template',
    data: {
      "id": "bid-req-123",
      "test": 1,
      "imp": [
        {
          "id": "1",
          "banner": {
            "w": 300,
            "h": 250
          },
          "bidfloor": 0.5,
          "bidfloorcur": "USD"
        }
      ],
      "app": {
        "id": "app123",
        "name": "My App"
      },
      "user": {
        "id": "user789",
        "gender": "M",
        "customdata": "user_custom_data"
      },
      "device": {
        "ua": "Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)",
        "geo": {
          "lat": 51.5074,
          "lon": -0.1278,
          "country": "UK",
          "city": "London"
        },
        "ip": "118.179.97.87",
        "devicetype": 1,
        "make": "Apple",
        "model": "iPad Pro",
        "os": "iOS",
        "osv": "14.0",
        "language": "en"
      }
    }
  }
];

const RTBEditor = () => {
  
  const [requestBody, setRequestBody] = useState(JSON.stringify(templates[0].data, null, 2));
  const [responseBody, setResponseBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(1);
  const [responses, setResponses] = useState([]);
  const [endpoint, setEndpoint] = useState('http://localhost:8080/bid');

  const generateRandomRequest = () => {
    const templateIndex = Math.floor(Math.random() * templates.length);
    const template = templates[templateIndex];
    const randomRequest = {
      ...template.data,
      id: `bid-req-${Math.random().toString(36).substr(2, 9)}`,
      imp: [{
        ...template.data.imp[0],
        id: Math.random().toString(36).substr(2, 9),
        bidfloor: parseFloat((Math.random() * 5).toFixed(2))
      }]
    };
    return randomRequest;
  };

  const getAdmContent = (response) => {
    try {
      // const htmlstring = DOMPurify.sanitize(response.seatbid[0].bid[0].adm);
      // console.log((htmlstring));
      // console.log(htmlParser.parse(response.seatbid[0].bid[0].adm));
      return response.seatbid[0].bid[0].adm ;
    } catch (e) {
      return null;
    }
  };
  

  const sendMultipleRequests = async (isRandom = true) => {
    setLoading(true);
    setError('');
    setResponses([]);
    
    const requests = Array(parseInt(requestCount)).fill().map(() => 
      isRandom ? generateRandomRequest() : JSON.parse(requestBody)
    );
    const results = [];

    try {
      for (let request of requests) {
        try {
          const response = await axios.post(endpoint, request, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          results.push(response.data);
        } catch (err) {
          results.push({
            error: err.message,
            status: 'error'
          });
        }
      }
      
      setResponses(results);
      setResponseBody(JSON.stringify(results, null, 2));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        OpenRTB Testing Interface
      </Typography>
  
      {/* Moved Buttons and Sample Request Templates Section */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Button
          variant="contained"
          onClick={() => sendMultipleRequests(true)}
          disabled={loading}
        >
          {loading ? 'Sending...' : `Send ${requestCount} Random Request${requestCount > 1 ? 's' : ''}`}
        </Button>
        <Button
          variant="outlined"
          onClick={() => sendMultipleRequests(false)}
          disabled={loading}
        >
          {loading ? 'Sending...' : `Send ${requestCount} Custom Request${requestCount > 1 ? 's' : ''}`}
        </Button>
        {error && (
          <Alert severity="error" sx={{ flexGrow: 1 }}>
            {error}
          </Alert>
        )}
      </Box>
  
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sample Request Templates
        </Typography>
        <Grid container spacing={2}>
          {templates.map((template, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setRequestBody(JSON.stringify(template.data, null, 2))}
              >
                {template.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
  
      {/* Original Input Fields */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          type="number"
          label="Number of Requests"
          value={requestCount}
          onChange={(e) => setRequestCount(Math.max(1, parseInt(e.target.value) || 1))}
          InputProps={{ inputProps: { min: 1 } }}
          sx={{ width: 200 }}
        />
        <TextField
          fullWidth
          label="Endpoint URL"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
      </Box>
  
      {/* Request and Response Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Request Template" />
            <CardContent>
              <StyledTextarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
              />
              {responses.map((response, index) => {
                const adm = getAdmContent(response);
                return adm ? (
                  <iframe title='adfinix' srcDoc={adm} frameborder="0" />
                ) : null;
              })}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Response Body" />
            <CardContent>
              <StyledTextarea
                value={responseBody}
                readOnly
                sx={{ bgcolor: 'grey.50' }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  
      {/* Request Summary */}
      {responses.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Request Summary
          </Typography>
          <Grid container spacing={2}>
            {responses.map((result, index) => (
              <Grid item xs={12} key={index}>
                <Alert severity={result.error ? 'error' : 'success'}>
                  Request {index + 1}: {result.error ? 
                    `Error - ${result.error}` : 
                    'Success - Bid Response Received'}
                </Alert>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default RTBEditor;
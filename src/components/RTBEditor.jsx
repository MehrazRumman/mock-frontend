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
  TextField,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';

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
  } ,
  {
    name: 'Banner (Transsion)',
    data: {
      id: "240",
      test: 1,
      imp: [{
        id: "1",
        banner: {
          format: [{ w: 480, h: 320 }, { w: 1024, h: 728 }],
          w: 480,
          h: 320
        },
        displaymanagerver: "1.4.2.6",
        instl: 0,
        tagid: "220518anmvgUwr",
        bidfloor: 0.1,
        bidfloorcur: "USD"
      }],
      app: {
        id: "fda34eee7c094636ae70516b3047e970",
        name: "",
        ver: "5.3.6.00002",
        bundle: "com.transsion.phonemaster",
        storeurl: "https://play.google.com/store/apps/details?id=com.transsion.phonemaster"
      },
      device: {
        ua: "Mozilla/5.0 (Linux; Android 8.0.0; ar-eg; Infinix X573B Build/OPR1.170623.032;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36",
        ip: "102.185.132.201",
        geo: { country: "IN", region: "", city: "", type: 2 },
        carrier: "",
        language: "ar",
        make: "Infinix",
        model: "Infinix X573B",
        os: "ANDROID",
        osv: "8.0.0",
        w: 720,
        h: 1440,
        ppi: 2,
        connectiontype: 5,
        devicetype: 1,
        ifa: "78d98c24-8a33-4b51-a92f-165c2326332e",
        mccmnc: "01602"
      },
      user: { geo: { lat: 0, lon: 0 } },
      at: 2,
      tmax: 650,
      bapp: ["com.pjpj.cleanmaster"],
      source: { ext: { schain: { ver: "1.0", complete: 0, nodes: [{ sid: "7e9d3934e4c45b0c71ef9d6218460157d4778512", hp: 1 }] } } }
    }
  },
  {
    name: 'Interstitial (Transsion)',
    data: {
      "id": "240",
      "test": 1,
      "imp": [{
        "id": "1",
        "banner": {
          "format": [{ "w": 300, "h": 250 }, { "w": 300, "h": 300 }],
          "w": 300,
          "h": 250
        },
        "displaymanagerver": "1.4.2.6",
        "instl": 1,
        "tagid": "220518anmvgUwr",
        "bidfloor": 0.1,
        "bidfloorcur": "USD"
      }],
      "app": {
        "id": "fda34eee7c094636ae70516b3047e970",
        "name": "",
        "ver": "5.3.6.00002",
        "bundle": "com.transsion.phonemaster",
        "storeurl": "https://play.google.com/store/apps/details?id=com.transsion.phonemaster"
      },
      "device": {
        "ua": "Mozilla/5.0 (Linux; Android 8.0.0; ar-eg; Infinix X573B Build/OPR1.170623.032;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36",
        "ip": "102.185.132.201",
        "geo": {
          "country": "IN",
          "region": "",
          "city": "",
          "type": 2
        },
        "carrier": "",
        "language": "ar",
        "make": "Infinix",
        "model": "Infinix X573B",
        "os": "ANDROID",
        "osv": "8.0.0",
        "w": 720,
        "h": 1440,
        "ppi": 2,
        "connectiontype": 5,
        "devicetype": 1,
        "ifa": "78d98c24-8a33-4b51-a92f-165c2326332e",
        "mccmnc": "01602"
      },
      "user": {
        "geo": { "lat": 0, "lon": 0 }
      },
      "at": 2,
      "tmax": 650,
      "bapp": ["com.pjpj.cleanmaster"],
      "source": {
        "ext": {
          "schain": {
            "ver": "1.0",
            "complete": 0,
            "nodes": [{
              "sid": "7e9d3934e4c45b0c71ef9d6218460157d4778512",
              "hp": 1
            }]
          }
        }
      }
    }
  },
  {
    "name": "Native (Transsion)",
    "data": {
        "app": {
            "ver": "8.5.22",
            "storeurl": "https://play.google.com/store/apps/details?id=com.transsion.XOSLauncher",
            "name": "",
            "id": "cdfe964c4ac84812b03d67209d27d50b",
            "bundle": "com.transsion.XOSLauncher"
        },
        "at": 2,
        "tmax": 17950,
        "source": {
            "ext": {
                "schain": {
                    "ver": "1.0",
                    "nodes": [{
                        "hp": 1,
                        "sid": "7e9d3934e4c45b0c71ef9d6218460157d4778512"
                    }],
                    "complete": 0
                }
            }
        },
        "id": "7789bf00-7a21-4e40-b566-2e2f55b0aa49",
        "imp": [{
            "native": {
                "request": "{\"native\":{\"ver\":\"1.2\",\"assets\":[{\"id\":101,\"required\":0,\"title\":{\"len\":150}},{\"id\":102,\"required\":0,\"data\":{\"type\":2,\"len\":150}},{\"id\":103,\"required\":0,\"data\":{\"type\":12,\"len\":80}},{\"id\":104,\"required\":0,\"img\":{\"type\":1,\"wmin\":50,\"hmin\":50}},{\"id\":105,\"required\":1,\"img\":{\"type\":3,\"wmin\":200,\"hmin\":200}}]}}",
                "ver": "1.2"
            },
            "tagid": "88c2b82c804b4d0f87b1463f0363827d",
            "displaymanagerver": "1.2.1.12",
            "bidfloor": 0.2,
            "bidfloorcur": "USD",
            "id": "1",
            "instl": 0
        }],
        "device": {
            "macsha1": "6e83288ba088225754a005d41c71d33718531af8",
            "didmd5": "",
            "os": "ANDROID",
            "ifa": "ffe1c2c0-4d39-49bb-a2d0-e4111af0bc90",
            "ip": "182.2.104.93",
            "ppi": 2,
            "h": 1600,
            "language": "in",
            "macmd5": "37f3c855eb5d743c511ab98bebb83554",
            "ua": "Mozilla/5.0 (Linux; Android 9; in-id; Infinix X650C Build/PPR1.180610.011;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36",
            "devicetype": 1,
            "geo": {
                "country": "ID",
                "city": "Mogoi",
                "region": "IDN",
                "type": 2
            },
            "carrier": "",
            "osv": "9",
            "dpidmd5": "115a9cc9760859111330941e6b591f92",
            "mccmnc": "10510",
            "w": 720,
            "didsha1": "",
            "model": "Infinix X650C",
            "connectiontype": 6,
            "make": "Infinix",
            "dpidsha1": "d4f0991910a9932d5d1640ea375eeb3fe5776265"
        },
        "user": {
            "geo": {
                "lon": 109.77487666666666,
                "lat": 1.395295
            }
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setSnackbarMessage('Copied to clipboard!');
        setSnackbarOpen(true);
      })
      .catch(err => {
        setSnackbarMessage('Failed to copy: ' + err.message);
        setSnackbarOpen(true);
      });
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
            <CardHeader title="Request Template" 
            action={
              <IconButton onClick={() => copyToClipboard(requestBody)}>
                <ContentCopyIcon />
              </IconButton>
            }
            />
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
            <CardHeader title="Response Body" 
            action={
              <>
              <IconButton onClick={() => copyToClipboard(responseBody)} color="primary">
                <ContentCopyIcon />
              </IconButton>
          
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
              />
            </>
            }
            />
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
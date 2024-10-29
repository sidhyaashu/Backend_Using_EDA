import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';

// Define the options for the test
export const options = {
    // Set the number of virtual users
    vus: 50, // You can adjust this based on your system capacity
    duration: '10m', // Run the test for 10 minutes
    // Set a threshold for response time
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% of requests should be under 500ms
    },
};

export default function () {
    const response = http.post('http://localhost:3000/create-post', JSON.stringify({
        title: `Test ${__VU}`, // Unique title for each VU
        content: `Test content from VU ${__VU}`, // Unique content for clarity
    }), {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    // Check the response status and log it for debugging
    check(response, {
        'is status 200': (r) => r.status === 200,
    });

    console.log(`Response status: ${response.status}`);

    sleep(1); // Sleep to simulate real user behavior
}

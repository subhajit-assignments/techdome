import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 5,          // 5 concurrent virtual users
    iterations: 5,   // Each user runs once
};

export default function () {
    const baseUrl = 'https://techdome.io';
    let res = http.get(`${baseUrl}/`);
    check(res, {
        'homepage returned 200': (r) => r.status === 200,
    });

    res = http.get(`${baseUrl}/contact-us`);
    check(res, {
        'contact page returned 200': (r) => r.status === 200,
    });
}
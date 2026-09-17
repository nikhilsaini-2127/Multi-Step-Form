# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.form.spec.js >> Form API >> posts 4000 generated records to /api/formData and saves successfully
- Location: tests\api.form.spec.js:11:3

# Error details

```
Error: apiRequestContext.post: connect ECONNREFUSED ::1:5000
Call log:
  - → POST http://localhost:5000/api/formData
    - user-agent: Playwright/1.62.1 (x64; windows 10.0) node/26.5
    - accept: */*
    - accept-encoding: gzip,deflate,br
    - Content-Type: application/json
    - content-length: 323

```
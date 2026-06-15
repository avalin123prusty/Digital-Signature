Postman testing instructions

Key flows to test:
1. Register & Login
   - POST `/api/auth/register` with `{ name, email, password }`
   - POST `/api/auth/login` with `{ email, password }` -> returns `token`

2. Upload a document
   - POST `/api/documents/upload` with `form-data` key `file`
   - Use `Authorization: Bearer <token>` header

3. Invite external signer (public link)
   - POST `/api/signatures/invite` with `{ documentId, signerEmail, message }`
   - Use `Authorization: Bearer <token>` header
   - Response contains `link` to share

4. Inspect public link
   - GET `/api/signatures/public/:token` -> returns `{ document, signature, email }`

5. Public sign
   - POST `/api/signatures/public/:token` with `{ coordinates, signatureText, signatureImage }`
   - No Authorization header required

6. Generate final signed PDF
   - POST `/api/documents/:id/generate` (protected)

Add these requests to your Postman collection and create environment variables for `baseUrl`, `token`, and `publicToken` for convenience.

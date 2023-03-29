import jwksClient from 'jwks-rsa';
import jwt from 'jsonwebtoken';
const { verify, decode } = jwt;

// Reference: https://stackoverflow.com/a/55075205
export async function verify_token(token) {
    if (!token) {
        console.log('No token was given');
        return false;
    }

    const decoded = decode(token, { complete: true });
    const client = jwksClient({
        jwksUri: 'https://login.microsoftonline.com/common/discovery/keys',
    });
    const key = await client.getSigningKey(decoded.header.kid);
    const signing_key = key.getPublicKey();
    const options = {
        algorithms: ['RS256'],
        header: decoded.header,
    };

    try {
        const verified_decoded = verify(token, signing_key, options);
        // audience should be a registered application of this app
        if (verified_decoded.aud !== process.env.AZ_APP_ID) {
            console.log('Audience ID not matched');
            console.log(`Received: ${verified_decoded.aud}, Expected: ${process.env.AZ_APP_ID}`);
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }

    return true;
}
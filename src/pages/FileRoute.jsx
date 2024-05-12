import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import * as jose from 'jose'
const secret = import.meta.env.SECRET_KEY;

const FileRoute = () => {
    const { username, doc } = useParams();

    useEffect(() => {
    async function fetchData() {
        const secret = import.meta.env.VITE_SECRET_KEY;
        const secretKey = new TextEncoder().encode(secret);
        const userData = {
            username,
            doc
        };

        const alg = 'HS256'

        const jwt = await new jose.SignJWT(userData)
       .setProtectedHeader({ alg })
       .setIssuedAt()
       .setIssuer('versionvaulthub.com:issuer')
       .setAudience('versionvaulthub.com:audience')
       .setExpirationTime('10s')
       .sign(secretKey)

        const jwt_token = jwt;

        console.log(jwt_token);

        const response = await axios.get('/docs/getOne', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwt_token,
                    }
                });
        console.log(response.data);
        window.location.replace(response.data.url);
    }

    fetchData();

}, [username, doc]);

    return (
        <div>
            <span className="loading loading-spinner loading-md"></span>
        </div>
    );
};

export default FileRoute;
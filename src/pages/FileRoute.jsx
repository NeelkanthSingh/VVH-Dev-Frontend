import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import * as jose from 'jose'
const secret = import.meta.env.SECRET_KEY;

const FileRoute = () => {
    const { username, doc } = useParams();

    useEffect(() => {
    async function fetchData() {
        const response = await axios.get('/docs/getOne', {
                    params: {
                        username: username,
                        doc_name: doc
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

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
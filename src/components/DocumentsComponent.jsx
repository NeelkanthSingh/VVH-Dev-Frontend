import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authAtom } from '../store/atoms/authAtom';
import axios from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';

const DocumentComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useRecoilState(authAtom);
    const [documents, setDocuments] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/docs/getAll', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth?.accessToken}`
                    }
                });
                setDocuments(response.data.documents.docs);
            } catch (error) {
                if (error.response && error.response.status === 403){
                    console.error(error);
                    setAuth({});
                    navigate("/signin", { state: { from: location } });
                }else{
                    console.error(error);
                }
            }
        };

        fetchData();
    }, [auth])

   const filteredDocuments = documents.filter(doc =>
    doc.doc_name.toLowerCase().includes(search.toLowerCase())
);

    return (
        <div className="p-2">
            <div className="flex items-center justify-between mb-8 border-shadow-300 mr-[52px] py-2 px-8 shadow-md shadow-primary">
                <label className="input input-bordered flex items-center gap-2 mr-2">
                    <input
                        type="text"
                        className="grow"
                        name="search"
                        placeholder="Search documents"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>

                <div className="stats w-48 h-24 flex items-center">
                    <div className="stat">
                        <div className="stat-title text-blue-700">Total documents</div>
                        <div className="stat-value text-blue-700">{documents.length}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {filteredDocuments.map((doc, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
                <div className='flex items-center'>
                    <button className="btn btn-lg btn-outline w-44">{doc.doc_name}</button>
                </div>
            </div>
        ))}
            </div>
        </div>
    );
};

export default DocumentComponent;

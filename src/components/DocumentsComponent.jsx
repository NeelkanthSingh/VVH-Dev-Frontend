import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authAtom } from '../store/atoms/authAtom';
import axios from '../api/axios';
import { useNavigate, useLocation } from 'react-router-dom';
import uploadingAtom from '../store/atoms/uploadingAtom';

const DocumentComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [auth, setAuth] = useRecoilState(authAtom);
    const [documents, setDocuments] = useState([]);
    const [search, setSearch] = useState('');
    const uploading = useRecoilValue(uploadingAtom);

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
    }, [auth, setAuth, navigate, location, uploading])

   const filteredDocuments = documents.filter(doc =>
    doc.doc_name.toLowerCase().includes(search.toLowerCase())
);

    function onClickHandler(doc_name) {
        const doc = documents.find(doc => doc.doc_name === doc_name);
        window.open(doc.doc_url, '_blank');
    }

    return (
        <div className="p-2 mr-[52px]">
            <div className="flex items-center justify-between mb-8 border-shadow-300 border-[1px] rounded-md mt-4 py-2 px-8">
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

                <div className='flex justify-items-end'>
                    <div className="badge badge-lg">{documents.length}</div>
                    {uploading ? <span className="loading loading-ball loading-md text-accent"></span> : null}
                </div>
            </div>
<div className="overflow-x-auto">
  <table className="table table-zebra">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Open</th>
      </tr>
    </thead>
 <tbody>
    {filteredDocuments.map((doc, index) => (
      <tr>
        <th>{index+1}</th>
        <td>{doc.doc_name}</td>
        <td><button onClick={()=>onClickHandler(doc.doc_name)}>Open</button></td>
      </tr>
    ))}
</tbody>
  </table>
</div>
        </div>
    );
};

export default DocumentComponent;

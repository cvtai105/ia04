import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';

function Profile() {
    const { loggedIn, fetchWithAuth } = useContext(AppContext);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
        } else {
            setLoading(true);
            fetchWithAuth(`${process.env.REACT_APP_API_URL}/api/profile`)
                .then((data) => {
                    setUserData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [loggedIn, navigate]);

    const handleGoBack = () => {
        navigate('/'); // navigates to the previous page
    };

    if (loading) {
        return (
            <div className="max-w-xl mx-auto mt-12 p-10 text-center border border-gray-300 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
                <p className="text-lg text-gray-600 mb-6">Loading user data...</p>
            </div>
        );
    }else{
        if (!loggedIn) {
            return (
                <div className="max-w-xl mx-auto mt-12 p-10 text-center border border-gray-300 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
                    <p className="text-lg text-gray-600 mb-6">You are not authorized to access this page.</p>
                    <button
                        onClick={handleGoBack}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Back to home page
                    </button>
                </div>
            );
        }
        else{
            return (
                <div className="max-w-xl mx-auto mt-12 p-10 text-center border border-gray-300 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>
                    <div className="text-lg text-gray-600 mb-6">
                        <p><strong>Name:</strong> {userData?.name}</p>
                        <p><strong>Email:</strong> {userData?.email}</p>
                    </div>
                </div>
            );
        }
    }
}

export default Profile;

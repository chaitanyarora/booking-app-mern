import React from 'react'
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Perks from '../Perks';
import axios from "axios";

import PhotosUploader from '../PhotosUploader';

const PlacesPage = () => {
    const { action } = useParams();

    
    const [rediredtToPlacesList, setRediredtToPlacesList] = useState(false);

   
    
    if(rediredtToPlacesList && action !== 'new') {
        return <Navigate to={'/account/places'} />;
    }


    return (
        <div>
            {action !== 'new' && (<div className='text-center'>
                <Link className='inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
        )}

            {action === 'new' && (
                
            )}

        </div>
    )
}

export default PlacesPage
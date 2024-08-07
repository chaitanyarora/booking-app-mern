import React from 'react'
import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Perks from '../Perks';
import axios from "axios";
import PhotosUploader from '../PhotosUploader';
import AccountNav from '../AccountNav';

const PlacesFormPage = () => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

    function inputHeader(text) {
        return (
            <h2 className='text-2xl mt-4'>{text}</h2>
        )
    }

    function inputDescription(text) {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addNewPlace(ev) {
        ev.preventDefault();

        await axios.post('/places', {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests});
        setRedirect(true);
    }


    if (redirect) {
        return <Navigate to={'/account/places'} />
    }
  return (
    <div>
    <AccountNav />
                    <form onSubmit={addNewPlace}>
                        {preInput('Title', 'Give a catchy title to your place')}
                        <input type="text"
                            placeholder='Title of your apartment'
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                        />

                        {preInput('Address', 'Give the address to this place')}
                        <input type="text"
                            placeholder='address'
                            value={address}
                            onChange={ev => setAddress(ev.target.value)}
                        />

                        {preInput('Photos', 'more = better')}
                        
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                        {preInput('Description', 'description of the place')}
                        <textarea
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                        />

                        {preInput('Perks', 'select what perks your apartment has')}
                        <Perks selected={perks} onChange={setPerks} />

                        {preInput('Extra Info', 'house rules etc')}
                        <textarea
                            value={extraInfo}
                            onChange={ev => setExtraInfo(ev.target.value)}
                        />


                        {preInput('Check In&Out times', 'keep a check fro cleaning the room')}
                        <div className='grid gap-2 sm:grid-cols-3'>
                            <div className='mt-2 -mb-1'>
                                <h3>Check In Time</h3>
                                <input type="text" placeholder='16:00'
                                    value={checkIn}
                                    onChange={ev => setCheckIn(ev.target.value)}
                                />
                            </div>
                            <div className='mt-2 -mb-1'>
                                <h3>Check Out Time</h3>
                                <input type="text" placeholder='21:00'
                                    value={checkOut}
                                    onChange={ev => setCheckOut(ev.target.value)}
                                />
                            </div>
                            <div className='mt-2 -mb-1'>
                                <h3>Max number of guests</h3>
                                <input
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)}
                                    type="number" />
                            </div>
                        </div>
                        <button className='primary my-4'>Save</button>
                    </form>
                </div>
  )
}

export default PlacesFormPage
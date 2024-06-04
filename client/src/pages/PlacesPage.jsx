import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Perks from '../Perks';
import axios from "axios";

const PlacesPage = () => {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

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

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });

        setAddedPhotos(prev => {
            return [...prev, filename];
        });

        setPhotoLink('');
    }

    async function uploadPhoto(ev) {
        ev.preventDefault();

        const files = ev.target.files;
        const data = new FormData();

        for (let i=0; i<files.length; i++) {
            data.append('photos', files[i]);
        }

        await axios.post('/upload', data, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        }).then(response => {
            const {data: filename} = response;

            setAddedPhotos(prev => {
                return [...prev, filename];
            });

        })
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
            </div>)}

            {action === 'new' && (
                <div className=''>
                    <form>
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
                        <div className='flex gap-2'>
                            <input
                                type="text"
                                placeholder={'Add using a link ... jpg'}
                                value={photoLink}
                                onChange={ev => setPhotoLink(ev.target.value)}
                            />
                            <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
                        </div>


                        <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>

                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className='rounded-2xl' src={'http://localhost:4000/uploads/' + link} />
                                </div>
                            ))}
                            <label className='cursor-pointer flex items-center gap-2 justify-center text-2xl text-gray-600 border bg-transparent rounded-2xl p-2'>
                                <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                                </svg>
                                Upload
                            </label>
                        </div>

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
            )}

        </div>
    )
}

export default PlacesPage
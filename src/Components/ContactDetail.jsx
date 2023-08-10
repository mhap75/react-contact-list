import http from "../services/http"
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {TbArrowBackUp, TbEdit} from "react-icons/tb";
import {IconContext} from "react-icons";
import {TiTick} from "react-icons/ti";

const ContactDetail = () => {
    const {id} = useParams()
    const [contact, setContact] = useState(null)
    const [newContact, setNewContact] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const navigate = useNavigate()
    const getContactData = async () => {
        try {
            const {data} = await http.get(`contacts/${id}`)
            setContact(data)
            if (!newContact) {
                setNewContact(data)
            }
        } catch (err) {
            toast.error('Something went wrong!', {duration: 2000});
        }
    }

    const handleEdit = async () => {
        setIsEditing(!isEditing)
        if (isEditing) {
            await http.put(`contacts/${id}`, newContact)
            getContactData()
        }
    }

    const handleInputChange = (e) => {
        setNewContact({...newContact, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        getContactData()
    }, [])

    return (<section className="flex gap-4 bg-slate-200 rounded-lg mt-5 relative">
        {contact && <>
            <img src={contact.avatarUrl} alt={contact.contactName}
                 className="rounded-full max-w-full bg-purple-300 p-1 m-2"/>
            <div className="bg-slate-300 h-fit my-2 p-3 rounded-md">
                {!isEditing ? <> <h2 className="font-bold">Name: {contact.contactName}</h2>
                    <p>Email: {contact.contactEmail}</p></> : <><h2 className="font-bold">Name:
                    <input
                        onChange={handleInputChange} name="contactName"
                        className="font-bold w-fit" value={newContact.contactName}/>
                </h2>
                    <p>Email:
                        <input onChange={handleInputChange} name="contactEmail" value={newContact.contactEmail}/>
                    </p></>}
            </div>
            <div className="absolute right-2 top-2 flex gap-2">
                <IconContext.Provider value={{size: "2rem", className: "text-violet-500"}}>
                    <button title="Edit" className="hover:bg-slate-300 rounded"
                            onClick={handleEdit}>
                        {!isEditing ? <TbEdit/> : <TiTick/>}
                    </button>
                    <button title="Go back" className="hover:bg-slate-300 rounded" onClick={() => navigate(-1)}>
                        <TbArrowBackUp/>
                    </button>
                </IconContext.Provider>
            </div>
        </>}
    </section>)
}

export default ContactDetail
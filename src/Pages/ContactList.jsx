import {useEffect, useState} from "react";
import http from "../services/http"
import Contact from "../Components/Contact";
import {faker} from "@faker-js/faker";
import toast, {Toaster} from "react-hot-toast";
import {IoSearch} from "react-icons/io5";
import {IconContext} from "react-icons";
import contact from "../Components/Contact";

const ContactList = () => {
    const [newContact, setNewContact] = useState({contactName: "", contactEmail: "", avatarUrl: ""})
    const [contacts, setContact] = useState(null)
    const [allContacts, setAllContact] = useState(null)
    const [error, setError] = useState(null)
    const [searched, setSearched] = useState("")
    const handleInput = (e) => {
        setNewContact({...newContact, [e.target.name]: e.target.value});
        // localStorage.setItem("newContact", JSON.stringify(newContact))
    }

    const getContacts = async () => {
        try {
            const {data} = await http.get('contacts')
            setContact(data)
            setAllContact(data)
        } catch (err) {
            setError(true)
        }
    }

    useEffect(() => {
        getContacts()
        const localNewContact = JSON.parse(localStorage.getItem("newContact"))
        if (localNewContact) setNewContact(localNewContact)
    }, [])

    const handleAddNewContact = async (e) => {
        e.preventDefault();
        const profileAvatarUrl = faker.image.avatar()
        const contactId = faker.database.mongodbObjectId()
        try {
            await http.post('contacts', {...newContact, avatarUrl: profileAvatarUrl, id: contactId})
            toast.success("Contact added successfully", {
                duration: 3000, style: {fontWeight: 'bold', color: 'rgb(21 128 61)'}
            });
            getContacts()
        } catch (err) {
            setError(true)
        }
        setNewContact({contactName: "", contactEmail: ""})
    }

    const handleDelete = async (id) => {
        try {
            await http.delete(`contacts/${id}`)
            toast.success("Contact deleted successfully", {
                duration: 3000, style: {fontWeight: 'bold', color: 'rgb(190 24 93)'}
            });
            getContacts()
        } catch (err) {
            setError(true)
        }
    }

    const RenderContacts = () => {
        let renderedComponent = <p>Loading...</p>
        if (error) {
            toast.error('Something went wrong!', {duration: 5000});
            renderedComponent = <p>Error!</p>
        }
        if (!error && contacts) {
            renderedComponent = contacts.map((contact) => {
                return (<Contact contact={contact} key={contact.id} onDelete={handleDelete}/>)
            })

        }

        return renderedComponent;
    }

    const handleSearch = (e) => {
        setSearched(e.target.value)
        const searched = e.target.value.toLowerCase()
        const filteredContacts = allContacts.filter(c => {
            return Object.values(c).join(" ").toLowerCase().includes(searched)
        })
        setContact(filteredContacts)
    }

    return (<section>
        <h1 className="text-center font-bold text-2xl my-3">Contacts Manager</h1>
        <form className="flex flex-col max-w-6xl mx-auto gap-3 justify-between my-1"
              onSubmit={handleAddNewContact}>
            <input value={newContact.contactEmail} onChange={handleInput} placeholder="example@email.com" type="email"
                   name="contactEmail" id="contactEmail"
                   required={true}
                   autoComplete="email"/>
            <input value={newContact.contactName} onChange={handleInput} placeholder="Sarah Smith"
                   type="text" name="contactName"
                   id="contactName"
                   required={true}
                   autoComplete="name"/>
            <button className="btn-primary transition-all">Add to contact</button>
        </form>
        {/*Search section ********/}
        <IconContext.Provider value={{size: "1.5rem", className: "text-violet-500 mx-2"}}>
            <div className="flex items-center bg-violet-50 rounded-md py-1 px-2 mt-2">
                <IoSearch/>
                <input placeholder="search. . ." type="search" value={searched} onChange={handleSearch}
                       className="border-2 border-violet-200 w-20 focus:flex-1 duration-1000"/>
            </div>
        </IconContext.Provider>
        {/*Search section ********/}
        <RenderContacts/>
        {/*Toast Notification ********/}
        <Toaster toastOptions={{
            style: {
                background: "rgb(250 245 255)"
            },
        }}/>
        {/*Toast Notification ********/}
    </section>)
}

export default ContactList
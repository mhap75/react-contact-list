import {Link} from "react-router-dom";

const Contact = (props) => {

    return (<div className="flex items-center justify-between p-2 mx-3 my-2 bg-purple-50 rounded-md group">
        <div className="flex items-center gap-2">
            <img src={props.contact.avatarUrl} alt="user"
                 className="rounded-full max-w-[50px] border-2 border-gray-300"/>
            <div>
                <Link to={`/contacts/${props.contact.id}`} className="font-bold hover:underline">{props.contact.contactName}</Link>
                <p>{props.contact.contactEmail}</p>
            </div>
        </div>
        <button className="btn-danger opacity-0 group-hover:opacity-100 transition-all"
                onClick={() => props.onDelete(props.contact.id)}>delete
        </button>
    </div>)
}

export default Contact
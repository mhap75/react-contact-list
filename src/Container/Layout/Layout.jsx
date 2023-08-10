import {Fragment} from "react";
import Header from "../../Components/Header";
import {Footer} from "../../Components/Footer";

const Layout = (props) => {
    return (
        <Fragment>
            <Header/>
            <main className="container mx-auto pb-5">
                {props.children}
            </main>
            {/*<Footer/>*/}
        </Fragment>
    )
}

export default Layout;
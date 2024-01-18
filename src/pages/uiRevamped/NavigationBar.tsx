import './NavigationBar.css';
import isALogo from "../../media/Trajector Main Logo_Color.png";

export const NavigationBar = () => {
    return (
        <div className="sticky" style={{backgroundColor: "rgb(10, 25, 54)"}}>
            <div className="navbar">
                <div>
                    <img src={isALogo}
                                className="App-logo"
                                alt="logo"
                                /></div>
                <div className="btn">
                    <div className='btn-left'>
                    <div className="btn-home">Home</div>
                    <div className="btn-manage">Manage</div> 
                    </div>
                                         
                    <div className="btn-logout">Logout</div>
                </div>
            </div>
        </div>
    )
}
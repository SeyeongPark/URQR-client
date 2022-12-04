import CardFrame from "./card-frame"
import logo from '../../assets/images/urqr-logo.png'
const Main = () => {
 return (
    <div className="background">
    <div className="input-container">
        {/* <img src={logo} alt="logo" width={"100px"}/> */}
        <div className="nav-container">
            <CardFrame
                title="Create Card"
                src="https://cdn-icons-png.flaticon.com/512/7588/7588946.png"
                href="/create"
            />
            <CardFrame
                title="Search Card"
                src='https://cdn-icons-png.flaticon.com/512/751/751463.png'
                href="/search"
            />
        </div>
    </div>
    </div>
 )
}

export default Main
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import StyleColors from "../constants/StyleColors";
const Home = () => {
    return(
        <div className="w-screen">
            <Navbar />
            <div className="border-b flex flex-col sm:flex-row justify-center items-center p-10">
                <div className="p-5 w-full md:w-7/12 text-center md:text-left">
                    <h1 className="text-5xl md:text-7xl font-bold pb-10">UF Class Compass</h1>
                    <h3 className="text-4xl md:text-5xl pb-10">Plan your schedule with ease</h3>
                    <Link className="link-item" to="/schedule">
                        <button className="py-2.5 px-5 rounded-lg text-white text-xl lg:text-3xl" style={{backgroundColor: StyleColors.orange}}>Start Building Your Schedule Now</button>
                    </Link>
                </div>
                <div className="hidden md:block md:w-4/12 h-auto">
                    <img src="/working.png" className="w-full h-auto" alt="Logo"/>
                </div>
            </div>
            <div className="p-10" style={{backgroundColor: StyleColors.gray}}>
                <h1 className="text-center w-full text-3xl font-bold pb-5" style={{color: StyleColors.orange}}>What is UF Class Compass?</h1>
                <div className="flex-row md:flex md:justify-center md:gap-10">
                    <div className="w-full md:w-2/5 md:item-center">
                        <img className='w-full object-scale-down' src="/homeExample.png"/>
                    </div>
                    <div className="w-full pt-4 md:pt-0 md:w-2/5 space-y-5">
                        <div>
                            <h1 style={{color: StyleColors.orange}}>Your One-Stop Hub For All Things Scheduling</h1>
                            <p>Class Compass serves as a centralized platform for all tools needed to streamline the scheduling process every semester.</p>
                        </div>
                        <div>
                            <h1 style={{color: StyleColors.orange}}>Made By UF Students For UF Students</h1>
                            <p>As students, we understand the frustration of last minute schedule planning and the challenges of adjusting schedules on short notice. Our goal is to enhance this experience for all UF students.</p>
                        </div>
                        <div>
                            <h1 style={{color: StyleColors.orange}}>Enhanced Scheduling Tools</h1>
                            <p>We aim to provide robust features including support for multiple schedules, seamless course lookup, and personalized schedule suggestions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;

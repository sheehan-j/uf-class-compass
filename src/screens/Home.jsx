import Schedule from "../components/Schedule";
import Sidebar from "../components/Sidebar";


const Home = () => {
	return (
		<div className="w-screen h-screen flex">
			<Sidebar />
			<div className="w-full h-full flex p-14">
				<Schedule colCount={5} rowCount={8} />
			</div>
		</div>
	);
};

export default Home;

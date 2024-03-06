import Schedule from "../components/Schedule";
import Sidebar from "../components/Sidebar";


const Home = () => {
	return (
		<div className="w-screen h-screen flex">
			<Sidebar />
			<div className="w-full h-full flex py-20 px-10">
				<Schedule colCount={5} maxRowCount={11} />
			</div>
		</div>
	);
};

export default Home;

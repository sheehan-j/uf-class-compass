import Schedule from "../components/Schedule";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const SchedulePage = () => {
	return (
		<>
		<Navbar />
		<div className="w-full h-screen flex">
			<Sidebar />
			<div className="w-full h-full overflow-y-scroll">
				<Schedule colCount={5} maxRowCount={11} />
			</div>
		</div>
		</>
	);
};

export default SchedulePage;

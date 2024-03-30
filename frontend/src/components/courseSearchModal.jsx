import PropTypes from "prop-types";
import StyleColors from "../constants/StyleColors";
import RMPModal from "./RMPModal";
const CourseSearchModal = () => {
    return(
        <div className="w-full h-auto p-5 rounded-2xl relative mb-5" style={{backgroundColor: StyleColors.beige}}>
            <div className="absolute top-0 right-2">CLASS #27429</div>
            <div className="text-xl font-bold mb-2">CIS4930 - Special Topics in CISE: Internet Computing</div>
            <div className="w-full flex justify-between gap-5 mb-4 px-3">
                <div className="w-2/5 text-gray-700	">
                    <div className="grid grid-cols-2 gap-5 w-full">
                        <div><span>INSTRUCTOR</span></div>
                        <div className="font-medium"><span>ALBERT RITZHAUPT</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 w-full">
                        <div><span>CREDITS</span></div>
                        <div className="font-medium"><span>3</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-5 w-full">
                        <div><span>LOCATION</span></div>
                        <div className="font-medium"><span>FLG 230, 260</span></div>
                    </div>
                </div>
                <div className="w-fit">
                    <RMPModal />
                </div>
            </div>
        </div>
    )
}
export default CourseSearchModal;
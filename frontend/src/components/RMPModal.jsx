import { useState } from "react";
import StyleColors from "../constants/StyleColors";

const RMPModal = () => {
    const [numStars] = useState(4.3);
    const renderStars = () => {
        const roundedStars = Math.round(numStars * 2) / 2;
        const wholeStars = Math.floor(roundedStars);
        const hasHalfStar = roundedStars % 1 !== 0 && roundedStars % 1 >= 0.25 && roundedStars % 1 < 0.75;
        const stars = [];
        for (let i = 0; i < wholeStars; i++) {
            stars.push(<img key={"star"+i} src="/star.svg" alt="Star" />);
        }
        if (hasHalfStar) {
            stars.push(<img key="half-star" src="/halfStar.svg" alt="Half Star" />);
        }
        return (<span className="flex">{stars}</span>);
    };

    return(
        <div className="w-full flex justify-between gap-5">
            <div className="w-fit rounded-lg border-2  align-start sm:align-center py-1 px-2 md:px-12 text-start sm:text-center bg-white" style={{borderColor: StyleColors.blue}}>
                <div className="hidden sm:relative">{renderStars()}</div>
                <div className="relative">
                    <img key={"star"} src="/star.svg" alt="Star" className="inline-block sm:hidden"/>
                    <span className="font-black text-sm md:text-3xl">4.3</span>
                    <span className="text-sm absolute top-0 text-gray-400">/5</span>
                </div>
                <div className="underline text-blue-600 text-sm hover:text-blue-800 visited:text-purple-600">Go to RMP</div>
                </div>
            <div className="bg-white font-black w-fit h-fit p-1 px-2">R M P</div>
        </div>
    )
}

export default RMPModal;
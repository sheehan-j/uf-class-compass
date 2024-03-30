import Navbar from "../components/Navbar";
import CourseSearchModal from "../components/courseSearchModal";
import { useState } from "react";

const CourseSearch = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value.toUpperCase());
    };

    const clearInput = () => {
        setSearchText('');
        setSearchResults([]);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setSearchResults([
                "Search result 1",
            ]);
        }
    };


    return(
    <div className="w-full">
        <Navbar />
        <div className="content py-6 w-full flex flex-col items-center">
            <div className="w-4/5">
                <div className="flex justify-center gap-5 w-full mb-4">
                    <div className="w-16 h-full flex items-center justify-center">
                        <img src="/CourseCompassLogo.png" className="h-full" alt="Logo" />
                    </div>
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={searchText}
                            onChange={handleInputChange}
                            onKeyDown={handleSearch}
                            className="w-full h-full px-4 py-2 pl-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            placeholder="Search..."
                        />
                        <span className="absolute inset-y-0 left-3 flex items-center">
                            <img src="/search_icon.svg" className="h-5 w-5" alt="Search Icon" />
                        </span>
                        <button className="absolute inset-y-0 right-3 flex items-center" onClick={clearInput}>
                                <img src="/remove.svg"/>
                        </button>
                    </div>
                </div>
                {searchResults.length > 0 && (
                    <div className="text-left w-full font-bold text-2xl">
                        Search results for {searchText}
                    </div>
                )}
                <div className="w-full flex flex-col items-center my-5 my-5">
                    <CourseSearchModal />
                    <CourseSearchModal />
                    <CourseSearchModal />
                </div>
            </div>
        </div>
    </div>);
}

export default CourseSearch
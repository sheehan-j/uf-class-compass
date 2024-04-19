const { clear } = require("console");
const API_KEY = require("./key.js");
const fs = require("fs");
//const api = require("./DataEntryApi.js");
//const { createBuildingRecord, createInstructorRecord, createClassRecord, createSectionRecord } = require('./dataEntryApi.js');

const baseApiUrl = "http://localhost:6205/api";

const buildingMap = createMapFromJSON("./backend/scripts/buildings.json");

const createBuildingRecord = async (building) => {
  try {
    const response = await fetch(baseApiUrl + `/dataentry/building`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(building),
    });
    let result = null;
    if (response.status == 201) {
      result = response.json();
    } else {
      const errorMessage = await response.text();
      addtofaileduploadlist(
        building.code + " " + errorMessage,
        "Building failure: "
      );
    }
    return result;
  } catch (error) {
    console.error("Error uploading data:", error);
    addtofaileduploadlist(building.code, "Building failure: ");
  }
};

const createInstructorRecord = async (instructor) => {
  try {
    const response = await fetch(baseApiUrl + `/dataentry/instructor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instructor),
    });
    let result = null;
    if (response.status == 201) {
      result = response.json();
    } else {
      const errorMessage = await response.text();
      addtofaileduploadlist(
        instructor.name + " " + errorMessage,
        "Instructor failure: "
      );
    }
    return result;
  } catch (error) {
    console.error("Error uploading data:", error);
    addtofaileduploadlist(instructor.name, "Instructor failure: ");
  }
};

const createClassRecord = async (classObj) => {
  try {
    const response = await fetch(baseApiUrl + `/dataentry/class`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(classObj),
    });
    if (response.status != 201) {
      const errorMessage = await response.text();
      addtofaileduploadlist(
        classObj.code + " " + errorMessage,
        "Class failure: "
      );
    } else {
      const result = await response.json();
      return { ...result, status: response.status };
    }
  } catch (error) {
    console.error("Error uploading data:", error);
    addtofaileduploadlist(classObj.code, "Class failure: ");
  }
};

const createSectionRecord = async (section) => {
  try {
    const response = await fetch(baseApiUrl + `/dataentry/section`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(section),
    });
    if (response.status != 201) {
      const errorMessage = await response.text();
      addtofaileduploadlist(
        section.class + " " + section.number + " " + errorMessage,
        "Section failure: "
      );
    } else {
      const result = await response.json();
      return { ...result, status: response.status };
    }
  } catch (error) {
    console.error("Error uploading data:", error);
    addtofaileduploadlist(
      section.class + " " + section.number,
      "Section failure: "
    );
  }
};

function interpretday(day) {
  switch (day) {
    case "M":
      return 1;
    case "T":
      return 2;
    case "W":
      return 3;
    case "R":
      return 4;
    case "F":
      return 5;
    case "S":
      return 6;

    default:
      return 7;
  }
}
function readCourseFile() {
  // Function to read the file and call async function for each line

  const courseCodes = [];
  try {
    const data = fs.readFileSync(
      "./backend/scripts/allcoursecodes.txt",
      "utf8"
    );
    const lines = data.split("\n");

    for (let line of lines) {
      // Trim the line to remove any leading/trailing whitespace
      line = line.trim();

      // Check if the line is not empty
      if (line) {
        // Call your async function for each line
        courseCodes.push(line);
      }
    }
    console.log("Processing course file complete.");
    return courseCodes;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

function addtofailedlist(stringToAdd) {
  const filename = "./backend/scripts/allfailedcoursecodes.txt";
  try {
    // Read the contents of the file synchronously
    let data = fs.readFileSync(filename, "utf-8");

    // Split the contents into lines
    let lines = data.split("\n");

    // Find the index of the next open line (i.e., empty line or line with only whitespace)
    let nextOpenLineIndex = lines.findIndex((line) => line.trim() === "");

    // If no open line is found, add the string to the end of the file
    if (nextOpenLineIndex === -1) {
      nextOpenLineIndex = lines.length;
    }

    // Add the string to the next open line
    lines.splice(nextOpenLineIndex, 0, stringToAdd);

    // Join the lines back together
    let newData = lines.join("\n");

    // Write the updated contents back to the file synchronously
    fs.writeFileSync(filename, newData, "utf-8");

    console.log(
      `String "${stringToAdd}" added to the next open line of ${filename}`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

function addtoskippedlist(stringToAdd) {
  const filename = "./backend/scripts/skippedcourses.txt";
  try {
    // Read the contents of the file synchronously
    let data = fs.readFileSync(filename, "utf-8");

    // Split the contents into lines
    let lines = data.split("\n");

    // Find the index of the next open line (i.e., empty line or line with only whitespace)
    let nextOpenLineIndex = lines.findIndex((line) => line.trim() === "");

    // If no open line is found, add the string to the end of the file
    if (nextOpenLineIndex === -1) {
      nextOpenLineIndex = lines.length;
    }

    // Add the string to the next open line
    lines.splice(nextOpenLineIndex, 0, stringToAdd);

    // Join the lines back together
    let newData = lines.join("\n");

    // Write the updated contents back to the file synchronously
    fs.writeFileSync(filename, newData, "utf-8");

    console.log(
      `String "${stringToAdd}" added to the next open line of ${filename}`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

function addtofaileduploadlist(stringToAdd, type) {
  const filename = "./backend/scripts/faileduploads.txt";

  stringToAdd = type + " failure for " + stringToAdd;
  try {
    // Read the contents of the file synchronously
    let data = fs.readFileSync(filename, "utf-8");

    // Split the contents into lines
    let lines = data.split("\n");

    // Find the index of the next open line (i.e., empty line or line with only whitespace)
    let nextOpenLineIndex = lines.findIndex((line) => line.trim() === "");

    // If no open line is found, add the string to the end of the file
    if (nextOpenLineIndex === -1) {
      nextOpenLineIndex = lines.length;
    }

    // Add the string to the next open line
    lines.splice(nextOpenLineIndex, 0, stringToAdd);

    // Join the lines back together
    let newData = lines.join("\n");

    // Write the updated contents back to the file synchronously
    fs.writeFileSync(filename, newData, "utf-8");

    console.log(
      `String "${stringToAdd}" added to the next open line of ${filename}`
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

function clearlogs() {
  const files = [
    "./backend/scripts/faileduploads.txt",
    "./backend/scripts/skippedcourses.txt",
    "./backend/scripts/allfailedcoursecodes.txt",
  ];

  files.forEach((file) => {
    // Clear the contents of each file by writing an empty string to it synchronously
    fs.writeFileSync(file, "");
    console.log(`Cleared file: ${file}`);
  });
}

function createMapFromJSON(filePath) {
  // Read the JSON file synchronously
  const jsonData = fs.readFileSync(filePath, "utf8");

  // Parse the JSON data into an array of objects
  const jsonArray = JSON.parse(jsonData);

  // Create a new Map
  const map = new Map();

  // Iterate over the array of objects and populate the Map
  jsonArray.forEach((obj) => {
    // Assuming each object has an "ID" attribute
    const id = obj.ID;
    map.set(id, obj);
    console.log("Item added to map");
  });

  console.log("Map finished");
  // Return the reference to the Map
  return map;
}
async function searchPlaces(query) {
  // Constructing the API URL with the provided query and API key
  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;
  // Making the API request
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Initialize a variable to store the found place
    let foundPlace = null;

    // Iterate over the results and set the found place if valid
    for (const result of data.results) {
      const location = result.geometry.location;
      const latitude_ = location.lat;
      const longitude_ = location.lng;

      if (
        latitude_ >= 29 && //make sure it's in Gainesville
        latitude_ <= 30 &&
        longitude_ >= -83 &&
        longitude_ <= -82
      ) {
        const formattedAddress_ = result.formatted_address;
        const name_ = result.name;
        const placeId_ = result.place_id;

        foundPlace = {
          name: name_,
          placeId: placeId_,
          formattedAddress: formattedAddress_,
          latitude: latitude_,
          longitude: longitude_,
        };
        // Break the loop once a valid place is found
        break;
      }
    }
    // Return the found place (or null if no valid place is found)
    return foundPlace;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}

async function searchClass(courseCode) {
  // Constructing the API URL with the provided query and API key
  const apiUrl = `https://one.ufl.edu/apix/soc/schedule/?category=RES&term=2248&course-code=${courseCode}`;
  // Making the API request
  return await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (
        data &&
        Array.isArray(data) &&
        data.length > 0 &&
        data[0].COURSES &&
        Array.isArray(data[0].COURSES) &&
        data[0].COURSES.length > 0
      ) {
        const course = data[0].COURSES[0];

        return course;
      } else {
        console.log(
          `COURSES array is empty or not found for class ${courseCode}. Skipping...`
        );
        addtoskippedlist(courseCode);
        return null;
      }
      // You can further process the data here
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function getInstructor(instructor) {
  //get list of instructors in param
  //for each one attempt to add an instructor to the DB or link to an existing instructor in the DB
  //return that list?
  const instructorUpload = {
    name: instructor,
  };

  //TODO add in call to create instructor API
  await createInstructorRecord(instructorUpload);
  console.log(`Instructor ${instructorUpload.name} uploaded`);
}

async function getBuilding(buildingCode, buildingCodeLetters) {
  //get building code from map
  //search building up with google query searchPlace() func
  //return the building ?
  const buildingObj = buildingMap.get(buildingCode);
  const placeObj = await searchPlaces(buildingObj.NAME);

  const uploadedBuilding = {
    code: buildingCodeLetters,
    pid: placeObj.placeId,
    name: buildingObj.NAME,
    bid: buildingObj.ID,
    lat: buildingObj.LAT,
    long: buildingObj.LON,
  };

  await createBuildingRecord(uploadedBuilding);
  console.log(`Building ${uploadedBuilding.code} uploaded`);
  //TODO add in call to create building API
}

async function collectData() {
  clearlogs();

  //const courseCodes = readCourseFile();
  const courseCodes = ["ABE4949 ", "CAP3220"];
  const waitInterval = 1000;
  var courseCode;
  for (let index = 0; index < courseCodes.length; index++) {
    try {
      if (index !== 0) {
        await new Promise((resolve) => setTimeout(resolve, waitInterval)); // Wait logic
      }

      courseCode = courseCodes[index];
      const course = await searchClass(courseCode);

      if (course == null) {
        continue;
      }

      const courseUpload = {
        code: course.code,
        title: course.name,
        description: course.description,
        prerequisites: course?.prerequisites || null,
      };

      await createClassRecord(courseUpload);
      console.log(`Class ${course.code} uploaded`);

      for (const section of course.sections) {
        const classSectionUpload = {
          number: section.classNumber,
          class: course.code,
          instructor: section.instructors[0]?.name || "",
          credits: section.credits != "VAR" ? section.credits : 0,
          final: section.finalExam,
          department: section.deptName,
          meetings: [],
          isOnline: !(section.meetTimes.length > 0),
        };

        await getInstructor(section.instructors[0]?.name || "");

        if(section.meetTimes.length > 0){
          for (const meeting of section.meetTimes) {
            let meetDay;
            for (const day of meeting.meetDays) {
              meetDay = interpretday(day);
              classSectionUpload.meetings.push({
                day: meetDay,
                period: meeting.meetPeriodBegin,
                length: meeting.meetPeriodEnd - meeting.meetPeriodBegin + 1,
                room: meeting.meetRoom,
                building: meeting.meetBuilding,
              });
              await getBuilding(meeting.meetBldgCode, meeting.meetBuilding);
            }
          }
        } 
        
        await createSectionRecord(classSectionUpload);
        console.log(`Section ${course.code} + ${section.classNumber} uploaded`);
        //TODO call create class API statement for create section
      }
    } catch (error) {
      addtofailedlist(courseCode);
      console.error(
        "There was a problem with the class " + courseCode + " : ",
        error
      );
    }
  }
}

//Function Caller
(async () => {
  try {
    console.log("Started");
    await collectData();
    console.log("Ended");
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();

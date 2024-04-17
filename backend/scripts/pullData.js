const API_KEY = require("./key.js");
const fs = require("fs");
const api = require("./DataEntryApi.js");

const buildingMap = createMapFromJSON("buildings.json");
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
async function readFile() {
  // Function to read the file and call async function for each line

  const courseCodes = [];
  try {
    const data = fs.readFileSync(filename, "utf8");
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
    console.log("Processing complete.");
  } catch (err) {
    console.error("Error reading the file:", err);
  }
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
  });

  // Return the reference to the Map
  return map;
}
async function searchPlaces(query) {
  // Constructing the API URL with the provided query and API key
  const apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;
  // Making the API request
  console.log(apiUrl);
  return await fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handling the response data
      data.results.forEach((result) => {
        // Accessing the formatted address
        var location = result.geometry.location;
        var latitude_ = location.lat;
        var longitude_ = location.lng;
        if (
          latitude_ >= 29 && //make sure it's in gaines
          latitude_ <= 30 &&
          longitude_ >= -83 &&
          longitude_ <= -82
        ) {
          var formattedAddress_ = result.formatted_address;
          var name_ = result.name;
          var placeId_ = result.place_id;

          var place = {
            name: name_,
            placeId: placeId_,
            formattedAddress: formattedAddress_,
            latitude: latitude_,
            longitude: longitude_,
          };
          return place;
        }
      });

      // You can further process the data here
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
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
      }
      // You can further process the data here
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function getInstructors(instructors) {
  //get list of instructors in param
  //for each one attempt to add an instructor to the DB or link to an existing instructor in the DB
  //return that list?

  await instructors.forEach(async instructor =>{
    const instructorUpload = {
      name: instructor,
    };

    //TODO add in call to create instructor API
    await api.createInstructorRecord(instructorUpload);
  });
}

async function getBuilding(buildingCode, buildingCodeLetters) {
  //get building code from map
  //search building up with google query searchPlace() func
  //return the building ?
  const buildingObj = buildingMap.get(buildingCode);
  const placeObj = searchPlaces(buildingObj.NAME);

  const uploadedBuilding ={ //TODO change this to match the DB schema
    code: buildingCodeLetters,
    pid: placeObj.placeId,
    name: buildingObj.NAME,
    //long: buildingObj.LON,
    //lat: buildingObj.LAT,
    //bid: buildingObj.ID
  }

  await api.createBuildingRecord(uploadedBuilding);
  //TODO add in call to create building API
}

async function collectData() {
  //Grab all uf courses
  //place into objects with proper formatting
  //grab all instructors in seperate data structure
  //run add instructor api until all instructors
  //store all the buildings codes into a data structure

  const courseCodes = await readFile();

  courseCodes.forEach(async (courseCode) => {
    const course = await searchClass(courseCode);

    const instructors = [];
    const courseUpload = {};

    courseUpload.code = course.code;
    courseUpload.title = course.name;
    courseUpload.description = course.description;
    courseUpload.preqrequisites = course.prerequisites;
    await api.createClassRecord(courseUpload);

    course.sections.forEach(async (section) => {
      var classSectionUpload = {};
      section.instructors.forEach((instructor) => {
        instructors.push(instructor);
      });

      classSectionUpload.number = section.classNumber;
      classSectionUpload.credits = section.credits;
      classSectionUpload.final = section.finalExam;
      classSectionUpload.department = section.deptName;
      //add instructor(s)
      classSectionUpload.instructors = 
      await getInstructors(instructors);

      section.meetings.forEach(async (meeting) => {
        var meetDay;
        section.meetDays.forEach(async (day) => {
          meetDay = interpretday(day);
          classSectionUpload.meetings.push({
            day: meetDay,
            period: meeting.meetPeriodBegin,
            length: meeting.meetPeriodEnd - meeting.meetPeriodBegin + 1,
            room: meeting.meetRoom,
            building: meeting.meetBuilding,
          });
          await getBuilding(meeting.meetBldgCode, meeting.meetBuilding)
        });
      });
      await api.createSectionRecord(classSectionUpload);
      //TODO call create class API statement for create section
    });
  });
}

//Function Caller
(async () => {
  try {
    //collectData();
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();

//Grab all uf courses
//place into objects with proper formatting
//grab all instructors in seperate data structure
//run add instructor api until all instructors
//store all the buildings codes into a data structure
const API_KEY = require('./key.js');
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
      var firstResult = data.results[0];
      // Accessing the formatted address
      var formattedAddress_ = firstResult.formatted_address;
      // Accessing the location (latitude and longitude)
      var location = firstResult.geometry.location;
      var latitude_ = location.lat;
      var longitude_ = location.lng;

      // Accessing the name
      var name_ = firstResult.name;
      // Accessing the place ID
      var placeId_ = firstResult.place_id;

      var place = {
        name: name_,
        placeId: placeId_,
        formattedAddress: formattedAddress_,
        latitude: latitude_,
        longitude: longitude_,
      }
    return place;
      // You can further process the data here
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function searchBuildings() {
    // Constructing the API URL with the provided query and API key
    const apiUrl = `https://campusmap.ufl.edu/library/cmapjson/search.json`;
    // Making the API request
    return await fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handling the response data
        
      return data;
        // You can further process the data here
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  async function searchClass(courseCode) {
    // Constructing the API URL with the provided query and API key
    const apiUrl = `https://one.ufl.edu/apix/soc/schedule/?category=RES&term=2238&course-code=${courseCode}`;
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
              `COURSES array is empty or not found for class ${classId}. Skipping...`
            );
          }
        // You can further process the data here
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
// Example usage
const query = "Florida Gymnasium"; // Replace with your query




(async () => {
    try {
        const place = await searchPlaces(query);
        //const buildings = await searchBuildings();
        console.log(place);
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();

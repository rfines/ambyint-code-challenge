## Full Stack Coding Challenge

#### Description
- Build a UI which will display a number of addresses retrieved from an api endpoint

#### Requirements
- Server
    - Geocode the items in the provided `addresses.csv` file by using the [Google Geocode API](https://developers.google.com/maps/documentation/javascript/geocoding)
    - Add any necessary api endpoints that allow you to fulfill the requirements of the client
- Client
    - Only display items that result in a rooftop location type
    - Allow toggling between a list view and a map view of the results
    - Allow searching for a full/partial address in the results
        - `123 Rick Street` should return when searching for `Rick`

#### Submission Instructions
- Clone this repository and commit your changes locally (or to a separate remote repository)
- You're free to use any packages or libraries which help you to complete these tasks
- We should be able to start the application by doing a `npm install` and `npm start` on both the client and server (we will be running the code and QA will also be looking at the final product)
- When you are finished, please send us a link to the completed repository or a zip of the contents if you prefer

#### Criteria
- Must fulfill all requirements completely
- Our tech stack includes React and Node, so that is our preference but not required
- Keep in mind best practices, screen resolution and future considerations
- Describe any challenges that made the task more difficult

#### Robert Fines' Solution
 I used Node and Mongodb on the backend along with the official Google Maps npm package to geocode the addresses on application startup. After the addresses are geocoded, I save them in a remote MongoDb instance with the pertinent values that are returned from the Geocoding API.

 Some things that made this more challenging on the backend were the number of duplicates in the csv file, thie unicode characters that were in the csv file and of course the rate limits for the Geocoding API are always a problem. Also I have not setup a Node server from scratch in quite some time, I normally user a boilerplate that I have built up over the years but it was way overkill for this project.

 For the client side I used Material-UI, React, and the react-google-maps package, along with a few convenience packages to build out a responsive and lightweight front end.
 In addition to the stated requirements I also allowed the user to show both the map and the list view at the same time. The user can also select some addresses on the list view using checkboxes then by clicking a button they are able to quickly see their selections on the map. I had planned to add some filtering and display options to enable some more advanced functionality but I wanted to make sure that the core funtionality was correct.


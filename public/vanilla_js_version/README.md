When cloning or pulling updates from this project, make sure to run the following command in order to
install all necessary dependencies:
npm install

Jest is used for unit testing. Please use node version 14.x.x when running the tests. Use the following command to run unit tests:
npm test

In order to run the webpage, you will need to create a local server. To do so, follow the steps below:

1. In a terminal, navigate to the dragon boat repository and execute the following command:
   python -m SimpleHTTPServer 1337

   If using Python 3.x or higher, use this command instead:
   python -m http.server 1337

2. In a browser, go to http://localhost:1337/index.html to view the webpage

Details for creating a local server can be found here: https://gist.github.com/jgravois/5e73b56fa7756fd00b89

NOTE: Sometimes, when you make a change to the code and refresh your browser, the webpage will not update. If using Chrome, you can resolve the issue by performing a hard reboot. Hold down the reload button near the address bar. A menu of different reload options will appear. Select "Hard Reboot"

References:
-Form for creating paddler:
https://www.youtube.com/watch?v=fNcJuPIZ2WE
https://www.youtube.com/watch?v=In0nB0ABaUk

-Creating tabs
https://www.youtube.com/watch?v=PzSxehu4G78

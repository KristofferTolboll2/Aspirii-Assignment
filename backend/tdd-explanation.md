#### Task 3: Describe Testing Strategy

The testing strategy for any application should be clear and well documented for the entire development team. This is especially important for a team that is working on a project for the first time. The testing strategy should be documented in the project's README file or a similar documentation file. The testing strategy should include the following:

<ul>
<li> Due to time constraints I only get to make unit tests for this project. </li>
<li> I have used Jest for testing the application and I have ensured that the the application is reloading the JSON data file after every run in order to ensure that the tests are not dependent on each other. </li>
<li> My initial approach was to write some test fucntions that tested all the functionality that was originally posted in the index.ts file </li> 
<li> Due to time constraints I only prepared the test suite, but I did not use a "real" test-driven-development approach, because i developed the functionality first, and then the unit tests afterwards. </li>
<li>If time had not been a constraint my approach would be to have a more clear scope of what I wanted to achieve, and have this could be tested in the best possible way. As the project would begin to scale, we would need to test the application in a more granular way, as different modules, services, database entities would become dependent on each other. </li>
<li>One thing that I would have liked to do is to have a function to seed the database with randomize data everytime, instead of loading in from the same JSON file. This would have made the testing more robust, and ensured that the tests would also cover different cases where the data is not the same as it currently is. It is usually not good practise to use the same dataset for testing, developing, and staging / production environments etc.. </li>
<li> Other than my `dragon.service.spec.ts` I would also have liked to have a test that is specifially for the controller file. This would have allowed me to test http methods and dto validation seperately from the busines logic.  </li>
<li> My preffered structure when working with NestJS is usually having 5 different components inside each module: `Entity` (database entity), `Repository` (database repository), `Service` (business logic), `Controller` (http methods), `DTO's` (data transfer objects). <br />

This ensures that we have a clear seperation of concerns, between data validation, business logic, http methods, and database logic. This makes our application very robus and very testable, because we can test database queries and business logic seperately. This makes finding bugs and errors much easier, and ensures that the tester (rather it be QA or the developer) can easily create a test suite, that isolates each part of the module. </li>

</li>

<li>Furthermore I would also like to implement some testing for the frontend as well. A tool like Cypress or Selenium, would be a good choice for this, as it allows to go through many user flows programatically, and is an essential part of any test suite.  </li>

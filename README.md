# IgniteInsight

IgniteInsight is a blogging platform that allows users to share their musings, insights, and technical knowledge. It is a space where users can post detailed articles, offering a look into their learning journey and the knowledge they have accumulated. It will serve as a portofolio for users to show off their work and research to potential employers or to aquaintances with a special interest in their professional endeavours.

## Technology Stack

### Frontend

The frontend of IgniteInsight is constructed using [Angular](https://angular.io/), a powerful JavaScript framework known for creating dynamic, single-page applications. The Angular application is responsible for rendering the user interface, handling user interactions, and communicating with the backend server to fetch and update data.

### Backend

The server-side of IgniteInsight employs [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/), a lightweight and efficient combination that is perfect for building APIs. The Express.js server handles incoming HTTP requests, interacts with the MongoDB database, and sends responses back to the client.

### Database

IgniteInsight stores article data in [MongoDB](https://www.mongodb.com/), a flexible and scalable NoSQL database that integrates well with the rest of the technology stack. Each article is stored as a document in the database, with fields for the title, content, image URL, tags, and view count.

### Hosting

IgniteInsight will be hosted on [Heroku](https://www.heroku.com/), a cloud platform offering a convenient and cost-effective hosting solution. Heroku supports Node.js applications and MongoDB databases, aligning perfectly with the technologies chosen for this project.

## Key Functionality

### Article Posting

Users can create and post articles on the platform. Each article includes a title, content, image URL, and tags. The content of the article supports rich text formatting for a better reading experience.

### Article Viewing

Articles can be viewed by all users. The platform tracks the number of views for each article with a special algorithm, and this data is used to display the most popular articles on the homepage.

### View Count Decay

To ensure that the most popular articles are the ones currently trending, the view count for each article decays over time. This is implemented using a scheduled task that runs at a set time and reduces the view count of each article by a set percentage.

### Design

The design of IgniteInsight is simple and user-friendly. It emphasizes its content, enabling readers to focus on the insights shared. This platform serves not just as a blog, but as a journey through the intellectual evolution of its users. It is a valuable tool for potential employers to gauge the depth and breadth of a user's expertise.

Frontpage - MVP
<img width="1424" alt="Screenshot 2023-06-02 at 15 24 05" src="https://github.com/Sandtory/IgniteInsight/assets/82057616/5dde24a9-bb41-4768-bc5f-0154636f8f4a">
<img width="1424" alt="Screenshot 2023-06-02 at 15 25 17" src="https://github.com/Sandtory/IgniteInsight/assets/82057616/19227a3f-ef25-4c76-9ab3-fe34c58f3f55">


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

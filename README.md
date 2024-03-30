# TevyatBloggers

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Overview

This project is a blogging website for Genshin Players to connect with each other by sharing details of their adventures within the game. It is developed as part of the SWE 4537 - Server Programming course.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies Used

* ![Express.js](https://img.shields.io/badge/Express.js-122658?style=for-the-badge&logo=express&logoColor=white)
* ![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
* ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
* ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) 
* ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running
- You will require a .env file before you can start running the project.
  * Create a file named `.env` in the `server/` folder.
  * Populate the file with the following environment variables according to your environment:
    ```sh
    MONGO_URI =
    GOOGLE_CLIENT_ID =
    GOOGLE_CLIENT_SECRET =
    ```
  * The `GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET` variables are created using Google Cloud Console for Google OAuth.
  * The `MONGO_URI` variable is the mongoDB link to the database used to store all the website information.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Xer0Bytes/Innuo.git
   ```
3. Install NPM packages for server
   ```bash
   cd server
   yarn install
   ```
4. Start the server
   ```bash
   yarn dev
   ```
5. Go to the following link to use the website locally:
   ```yaml
   http://localhost:3000/register
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

TevyatBloggers offers the following user-friendly features:

1. **User Authentication:**
   - Users can effortlessly create accounts and log in, ensuring the security of their data either locally or through their Google Account. For local login, users are prompted to verify their email address through a simple mail verification process.

2. **Post Creation:**
   - Easily craft captivating posts enriched with multimedia content such as images and videos to enhance engagement.

3. **Post Editing:**
   - Users have the flexibility to refine their posts by adding new images/videos or removing existing attachments, ensuring their content stays up-to-date.

4. **Interactive Comments:**
   - Engage in meaningful conversations by leaving comments on posts, fostering interaction and communication with fellow users. Additionally, users can effortlessly edit or delete their comments as needed.

5. **Like System:**
   - Express appreciation for captivating content with the like feature, providing users with a simple yet effective way to acknowledge and support engaging posts. Users can also easily track a post's popularity by viewing the number of likes it has garnered.

6. **Profile Management:**
   - Seamlessly manage profiles by viewing and editing personal information. Users also have the convenience of resetting forgotten passwords or updating passwords for added security.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

This project is licensed under the [MIT License](LICENSE).

<!-- CONTACTS -->
## Contact:
- **Nafisa Maliyat**
  - *GitHub:* [NafisaMaliyat-iut](https://github.com/NafisaMaliyat-iut)



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Img Shields](https://shields.io)
* [GitHub ReadMe Template](https://github.com/othneildrew/Best-README-Template/tree/master)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Dcard 2024 Frontend Intern Homework

## Overview
- [Introduction](#introduction)
- [How to use](#how-to-use)
  - [Try out online](#try-out-online)
  - [Run locally](#run-locally)
    - [OAuth Setup](#oauth-setup)
- [Tech Stack](#tech-stack)
- [Architecture and Explanation](#architecture-and-explanation)
- [Homework Requirements](#homework-requirements)

## Introduction
This project is a frontend intern homework for Dcard 2024, which implements Daniel's blog. The blog is a simple web application that allows admin user to create, edit, check out, and delete posts, also create and delete comments. On the other hand, normal users can only check out the posts, create and delete comments. Posts are stored as GitHub issues in a repository. The application uses GitHub OAuth to authenticate users and allow them to operate the GitHub API.

## How to use

### Try out online
<!-- TO BE ADDED -->

### Run locally
1. Make sure `Node.js`, `git`, `npm` or similar tools are installed.

2. Clone the repository and navigate to the project directory
```bash
git clone TODO
cd dcard-2024
```

3. Install dependencies
```bash
npm install
```

4. Set up environment variables
- Create a `.env.local` file in the project root directory and set the following environment variables
```env
GITHUB_ADMIN_NAME=
GITHUB_REPO_NAME=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
AUTH_SECRET=
AUTH_URL=
```
- Explanation to the environment variables:
    - `GITHUB_ADMIN_NAME` - The GitHub userid of the repository owner (E.g. `awkward-willy`)<br>Note1: please make sure to put the userid not the display name<br>Note2: the name should be the owner of the repository where the posts will be stored

    - `GITHUB_REPO_NAME` - The name of the repository where the posts(issue) will be stored

    - `GITHUB_CLIENT_ID` - The client ID of the OAuth App created on GitHub<br>
        - Check out the [OAuth Setup](#oauth-setup) section for more details

    - `GITHUB_CLIENT_SECRET` - The client secret of the OAuth App created on GitHub<br>
        - Check out the [OAuth Setup](#oauth-setup) section for more details

    - `AUTH_SECRET` - A secret key used to sign the JWT token
        - You can generate a random secret by the following command: 
        ```bash
        $ openssl rand -base64 32
        ```

    - `AUTH_URL` - The URL of the server where the app is hosted
        - If for local development, set it to `http://localhost:3000`
        - If for production, change `http://localhost:3000` to your production URL

5. Start the development/production server
```bash
# development mode
npm run dev

# production mode
npm run build
npm run start
```

### OAuth Setup
1. Create an OAuth App on GitHub
- Go to Settings > Developer settings > OAuth Apps > New OAuth App
- If for local development
    - Set `Homepage URL` to `http://localhost:3000`
    - Set `Authorization callback URL` to `http://localhost:3000/api/auth/callback/github`
- If for production
    - Change `http://localhost:3000` to your production URL

2. Set up environment variables
- Copy the `Client ID` and `Client Secret` from the OAuth App you created and paste them in the `.env.local` file

## Tech Stack
- **Next.js(APP router)** - The React framework
- **Auth.js v5** - authentication solution
- **Tailwind CSS** - For styling and responsive design
- **shadcn/ui** - UI component library
- **Zustand** - Global state management for certain components (e.g. CommentForm and InfiniteScrollComment)
- **Zod** - For form and Environment variable validation and type safety.

## Architecture and Explanation
<!-- TO BE ADDED -->

## Homework Requirements
- [x] Use React.js or a framework based on it, such as Next.js
- [x] Use Git version control and upload the code to GitHub. Submit the link after completing the assignment
- [x] Please describe in detail how to start the project and the design of the assignment structure in the README
- [x] GitHub Login
    - [x] Connect GitHub OAuth to allow users to have permission to operate the GitHub API
- [x] Post Management
    - [x] Use GitHub Issue as Post, and treat close Issue as deleting Post
- [x] User Interface
    - [x] List Page
        - [x] Load only 10 posts for the first time
        - [x] Automatically send an API request and load an additional 10 posts each time the list scrolls to the bottom until there are no more posts
    - [x] Post Page
        - [x] Display the post content and correctly render the markdown content
        - [x] Users can "edit" and "delete" here
        - [x] When adding/editing a post, you can use a Modal or jump to a new page to operate
        - [x] The form contains at least a title and a body
        - [x] Form validation: title is required, body needs at least 30 characters
- [x] Use TypeScript
- [x] Use Next.js + App Router
- [X] Adjust Web Vitals score
    - Basic optimization is implemented
- [x] Handle errors and exceptions (Error Handling)
    - Basic error handling is implemented<br>E.g. when users try to access a post that does not exist or deleted, the user will be redirected to the not-found page
- [ ] Deploy to an online environment
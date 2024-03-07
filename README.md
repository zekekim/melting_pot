# Melting Pot

Melting Pot is a dynamic web application designed for efficient and interactive user experiences involving cooking and recipe sharing. Follow these steps to set up and run the development environment on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Git
- Node.js
- Bun (optional)
- npm (if not using Bun)

## Getting Started

### Clone the Repository

First, clone the repository to your local machine using Git:

```bash 
git clone git@github.com:zekekim/melting_pot.git
cd melting-pot
```

### Install Dependencies

After cloning the repository, you need to install the project dependencies. You can do this using either Bun or npm.

#### Using Bun (Reccomended)

If you prefer to use Bun, run the following command:

```bash 
bun install
```

#### Using npm

If you're using npm instead, execute:

```bash
npm install
```

### Running the Development Server

After installing the dependencies, you can start the development server.

#### Using Bun

To run the development server with Bun, use the following command:

```bash
bun --bun run dev
```

#### Using npm

For npm, start the development server with:

```bash
npm run dev
```

### Accessing the Application

Once the development server is running, open your browser and navigate to:

```bash
http://localhost:3000
```

You should now see the Melting Pot application running locally on your machine.

## Additional Information

For more details on using Bun or npm commands, consult their respective documentation.

- Bun: [https://bun.sh/docs](https://bun.sh/docs)
- npm: [https://docs.npmjs.com/](https://docs.npmjs.com/)



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## TODO
- [ ] Daniel: Refresh posts on refresh page (Convert feed to client component)
- [ ] Daniel: Restructure Card, Refresh UsersPosts
- [ ] Will: Top 5 Posts on Account Page (Carousel for the Week)
    - Displays the post and handles query for top 5 in the week
- [ ] Chiemeka: Events and reccomended events
    - Make events work cuz they currently don't
    

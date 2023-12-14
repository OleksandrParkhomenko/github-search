# GitHub Search

GitHub Search is a web application that allows users users to search for repositories on Github, mark as favorites and rate them.

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/github-search.git
cd github-search
```

2. Install dependencies
```bash
npm install
```

3. Set environmental variables

Create <code>.env</code> file -> Use <code>.env.example</code> content as template -> Set your <b>GitHub access token</b> as <code>REACT_APP_GITHUB_API_TOKEN</code>

4. Start development server
```bash
npm start
```

## Usage

* Enter the name of a GitHub repository in the search bar.
* View the search results, including repository details.
* Load more repositories with the <b>Load More</b> button.
* You can add repository to favorites and rate it.
* Click on :blue_heart: <b>Favorites</b> in right corner and manage the list of favorite repositories.

## Deployment
The project is deployed on GitHub Pages. Visit [GitHub Search](https://github-search-alex-parkhomenkos-projects.vercel.app/) to see it live.

## Built With
* React
* Apollo Client for GraphQL queries
* Material-UI for styling
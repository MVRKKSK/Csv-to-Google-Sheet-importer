
# CSV to Google Spreadsheet Importer

Easily import CSV data into Google Spreadsheets with this simple web application.

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [Getting Started](#getting-started)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The CSV to Google Spreadsheet Importer is a web application that allows users to import CSV data into Google Spreadsheets seamlessly. It splits the process into frontend and backend components, providing efficient handling for both small and large CSV files.

## Usage

1. Visit the [CSV to Google Spreadsheet Importer](https://csv-to-google-sheet-importer.vercel.app/) website.

2. **Paste Spreadsheet URL**: Enter the URL of the Google Spreadsheet where you want to import your CSV data.

3. **CSV File Upload**: After pasting the URL, the application fetches the spreadsheet ID and displays it at the top. Now, click the "Choose File" button to upload your CSV file.

4. **Import Data**: Click the "Import Data" button to start the import process. The backend server will use your Google Cloud API key and credentials to post the CSV data to the specified spreadsheet URL.

5. **Check Your Spreadsheet**: After a brief processing time, your data will be inserted into the Google Spreadsheet. You can now check your spreadsheet to verify the import.

## Getting Started

### Frontend

1. Clone the repository and navigate to the "Development" branch:

   ```bash
   git clone -b Development https://github.com/yourusername/your-repo.git
   cd your-repo
   ```
### backend
```bash
git clone -b Server https://github.com/yourusername/your-repo.git
cd your-repo
cd server
npm install
```
Create a credentials.json file in the server folder and add your Google Cloud API key and credentials.
Start the backend server:

```bash
npm start
```
The backend server should now be running and ready to process import requests.
#Deployment
You can deploy the frontend and backend components separately. For example, you can host the React.js frontend on platforms like Vercel, Netlify, or GitHub Pages, while the backend server can be deployed on cloud providers like Heroku or AWS.

Ensure you set the appropriate environment variables for your deployments, including the Google Cloud API key and credentials.

Contributing
We welcome contributions to improve this project. Feel free to submit issues, feature requests, or pull requests.

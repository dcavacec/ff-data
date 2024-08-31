# ff-data
Fantasy football data app

## Purpose
The fantasy football draft is tonight, and I haven't prepared. To make it more likely I'm unprepared when it begins, let's create a simple app to provide historical fantasy football points data. 

## Goals
- Access historical ff points data in a web page/app
- Easily modify the dataset to summarize, filter, etc.
- Demonstrate skills
  - Version control
  - Client code
  - Server code

## Requirements
- Avoid frameworks and libraries where possilbe

## Data Source Analysis
- FF Points are dependent on scoring settings in each league
  - [FFToday](https://www.fftoday.com/index.html) has data back to 2001 and calculates points based on league settings you provide, but I don't see an API. I don't see terms of use or robots.txt.
  - [FantasyData] (https://fantasydata.com/nfl/fantasy-football-leaders) has a similar data span, but doesn't calculate points. Free tier limits results.
  - Didn't find an API for the historical data that isn't premium

## Plan
1. Use FFToday as source because it calculates points and offers a nice metric (consistency) for free.
2. Pull 2023 table for each relevant position based on defined scoring rules (URL parameter).
3. Normalize positions results.
4. Store normalized results in document database to limit overhead. 
5. Create basic SPA which serves the full dataset in a table. 
6. Provide interface to add filters, change sorting, etc.

## Features
- Sort by any column
- Filter any column

## Design
- Server
  - Fetch data, normalize it, and write to CSV in Node.js
  - Node.js doesn't include fetch and a parser by default, so will need two dependencies
    - jsdom
    - node-fetch
  - (mdn)[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API]: Fetch - only needs to run once/rarely
  - (mdn)[https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString]: Parsing HTML using DOMParser
- Client
  - HTML: Very simple page which displays a large table.
  - CSS: Optimization. Users are last-class citizens.
  - JS: All updates to the table (no fetches)
    - (w3schools)[https://www.w3schools.com/howto/howto_js_filter_table.asp]:  Filtering an HTML table
    - (w3schools)[https://www.w3schools.com/howto/howto_js_sort_table.asp]: Sorting an HTML table

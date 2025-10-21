
String Analyzer Service
A RESTful API built with Node.js and Express that analyzes strings and stores their computed properties.


 Features

Analyze a string and compute:Length
Palindrome check (case-insensitive)
Unique character count
Word count
SHA-256 hash
Character frequency map
Store and retrieve analyzed strings
Filter strings using query parameters
Natural language filtering
Delete strings


 Tech Stack

Node.js
Express.js
In-memory data store (JavaScript object)


 Project Structure
string-analyzer/
├── controllers/
│   └── stringController.js
├── routes/
│   └── stringRoutes.js
├── services/
│   └── analyzer.js
├── models/
│   └── stringStore.js
├── app.js
├── server.js
└── package.json




 Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/string-analyzer.git
cd string-analyzer


2. Install Dependencies
npm install


3. Run the Server
# For development
yarn dev
# Or
npm run dev

# For production
npm start




 API Endpoints
1. POST /strings
Analyze and store a string.
{
  "value": "string to analyze"
}


2. GET /strings/:string_value
Retrieve a specific analyzed string.
3. GET /strings
Retrieve all strings with optional filters:

is_palindrome
min_length
max_length
word_count
contains_character
4. GET /strings/filter-by-natural-language?query=...
Parse natural language queries like:

"all single word palindromic strings"
"strings longer than 10 characters"
5. DELETE /strings/:string_value
Delete a specific string.

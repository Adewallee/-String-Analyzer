# String Analyzer Service

A RESTful API built with Node.js and Express for analyzing strings and storing their computed properties.

## Features

For each analyzed string, the service computes and stores:

- `length`: Number of characters in the string
- `is_palindrome`: Boolean indicating if the string reads the same forwards and backwards (case-insensitive)
- `unique_characters`: Count of distinct characters in the string
- `word_count`: Number of words separated by whitespace
- `sha256_hash`: SHA-256 hash of the string for unique identification
- `character_frequency_map`: Object mapping each character to its occurrence count

## Endpoints

### 1. Create/Analyze String

**POST** `/strings`

**Request Body:**
```json
{
  "value": "string to analyze"
}
```

**Success Response (201 Created):**
```json
{
  "id": "sha256_hash_value",
  "value": "string to analyze",
  "properties": {
    "length": 16,
    "is_palindrome": false,
    "unique_characters": 12,
    "word_count": 3,
    "sha256_hash": "abc123...",
    "character_frequency_map": {
      "s": 2,
      "t": 3,
      "r": 2
    }
  },
  "created_at": "2025-08-27T10:00:00Z"
}
```

**Error Responses:**
- `409 Conflict`: String already exists
- `400 Bad Request`: Missing or invalid "value"
- `422 Unprocessable Entity`: "value" must be a string

---

### 2. Get Specific String

**GET** `/strings/{string_value}`

**Success Response (200 OK):** Same as above

**Error Response:**
- `404 Not Found`: String not found

---

### 3. Get All Strings with Filtering

**GET** `/strings?is_palindrome=true&min_length=5&max_length=20&word_count=2&contains_character=a`

**Success Response (200 OK):**
```json
{
  "data": [ /* matching strings */ ],
  "count": 15,
  "filters_applied": {
    "is_palindrome": true,
    "min_length": 5,
    "max_length": 20,
    "word_count": 2,
    "contains_character": "a"
  }
}
```

**Error Response:**
- `400 Bad Request`: Invalid query parameters

---

### 4. Natural Language Filtering

**GET** `/strings/filter-by-natural-language?query=all%20single%20word%20palindromic%20strings`

**Success Response (200 OK):**
```json
{
  "data": [ /* matching strings */ ],
  "count": 3,
  "interpreted_query": {
    "original": "all single word palindromic strings",
    "parsed_filters": {
      "word_count": 1,
      "is_palindrome": true
    }
  }
}
```

**Error Responses:**
- `400 Bad Request`: Unable to parse query
- `422 Unprocessable Entity`: Conflicting filters

---

### 5. Delete String

**DELETE** `/strings/{string_value}`

**Success Response (204 No Content)**

**Error Response:**
- `404 Not Found`: String not found

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/string-analyzer.git
cd string-analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Server
```bash
npm run dev
```

### 4. Environment Variables
No environment variables required for in-memory version.

---

## Testing

Use Postman or cURL to test the endpoints. Ensure all responses match the expected format.

---

## Dependencies

- express
- body-parser
- crypto
- nodemon (dev)

---

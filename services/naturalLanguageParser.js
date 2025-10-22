function parseQuery(query) {
  const filters = {};

  const lower = query.toLowerCase();

  if (lower.includes('palindromic')) {
    filters.is_palindrome = true;
  }

  const wordCountMatch = lower.match(/single word|(\d+)\s+word/);
  if (wordCountMatch) {
    filters.word_count = wordCountMatch[1] ? parseInt(wordCountMatch[1]) : 1;
  }

  const longerThanMatch = lower.match(/longer than (\d+)/);
  if (longerThanMatch) {
    filters.min_length = parseInt(longerThanMatch[1]) + 1;
  }

  const shorterThanMatch = lower.match(/shorter than (\d+)/);
  if (shorterThanMatch) {
    filters.max_length = parseInt(shorterThanMatch[1]) - 1;
  }

  const containsCharMatch = lower.match(/containing the letter (\w)/);
  if (containsCharMatch) {
    filters.contains_character = containsCharMatch[1];
  }

  if (Object.keys(filters).length === 0) {
    throw new Error('Unable to parse natural language query');
  }

  return filters;
}

module.exports = parseQuery;
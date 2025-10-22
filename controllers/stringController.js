const crypto = require('crypto');
const store = require('../models/stringStore');
const analyze = require('../services/analyzer');

exports.analyzeString = (req, res) => {
  const { value } = req.body;
  
  if (!value) {
    return res.status(400).json({ error: 'Missing "value" field' });
  }

  if (typeof value !== 'string') {
    return res.status(422).json({ error: '"value" must be a string' });
  }

  const hash = crypto.createHash('sha256').update(value).digest('hex');

  if (store[hash]) {
    return res.status(409).json({ error: 'String already exists' });
  }

  const properties = analyze(value);
  const created_at = new Date().toISOString();

  const result = {
    id: hash,
    value,
    properties: { ...properties, sha256_hash: hash },
    created_at
  };

  store[hash] = result;

  res.status(201).json(result);
};

exports.getString = (req, res) => {
  const value = req.params.string_value;
  const hash = crypto.createHash('sha256').update(value).digest('hex');

  const result = store[hash];
  if (!result) {
    return res.status(404).json({ error: 'String not found' });
  }

  res.status(200).json(result);
};


exports.deleteString = (req, res) => {
  const value = req.params.string_value;
  const hash = crypto.createHash('sha256').update(value).digest('hex');

  if (!store[hash]) {
    return res.status(404).json({ error: 'String not found' });
  }

  delete store[hash];
  res.status(204).send();
};

exports.getAllStrings = (req, res) => {
  const {
    is_palindrome,
    min_length,
    max_length,
    word_count,
    contains_character
  } = req.query;

  let results = Object.values(store);

  if (is_palindrome !== undefined) {
    results = results.filter(item => item.properties.is_palindrome === (is_palindrome === 'true'));
  }

  if (min_length) {
    results = results.filter(item => item.properties.length >= parseInt(min_length));
  }

  if (max_length) {
    results = results.filter(item => item.properties.length <= parseInt(max_length));
  }

  if (word_count) {
    results = results.filter(item => item.properties.word_count === parseInt(word_count));
  }

  if (contains_character) {
    results = results.filter(item => item.value.includes(contains_character));
  }

  res.status(200).json({
    data: results,
    count: results.length,
    filters_applied: {
      ...(is_palindrome !== undefined && { is_palindrome: is_palindrome === 'true' }),
      ...(min_length && { min_length: parseInt(min_length) }),
      ...(max_length && { max_length: parseInt(max_length) }),
      ...(word_count && { word_count: parseInt(word_count) }),
      ...(contains_character && { contains_character })
    }
  });
};

const parseQuery = require('../services/naturalLanguageParser');

exports.filterByNaturalLanguage = (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  try {
    const parsedFilters = parseQuery(query);
    let results = Object.values(store);

    if (parsedFilters.is_palindrome !== undefined) {
      results = results.filter(item => item.properties.is_palindrome === parsedFilters.is_palindrome);
    }

    if (parsedFilters.min_length) {
      results = results.filter(item => item.properties.length >= parsedFilters.min_length);
    }

    if (parsedFilters.max_length) {
      results = results.filter(item => item.properties.length <= parsedFilters.max_length);
    }

    if (parsedFilters.word_count) {
      results = results.filter(item => item.properties.word_count === parsedFilters.word_count);
    }

    if (parsedFilters.contains_character) {
      results = results.filter(item => item.value.includes(parsedFilters.contains_character));
    }

    res.status(200).json({
      data: results,
      count: results.length,
      interpreted_query: {
        original: query,
        parsed_filters: parsedFilters
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

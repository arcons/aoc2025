import fetch from 'node-fetch';
import { config } from 'dotenv';
import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import { resolve } from 'path';

// Load environment variables from .env file
config();

const YEAR = 2025;

async function fetchDay(day: number) {
  const dayString = day.toString().padStart(2, '0');
  const URL = `https://adventofcode.com/${YEAR}/day/${day}`;

  const sessionCookie = process.env.AOC_SESSION_COOKIE;
  if (!sessionCookie) {
    throw new Error('AOC_SESSION_COOKIE environment variable not set.');
  }

  console.log(`Fetching data for Year ${YEAR}, Day ${dayString}...`);

  // Fetch puzzle description
  const response = await fetch(URL, {
    headers: {
      cookie: `session=${sessionCookie}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${URL}: ${response.statusText}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const articles = $('article.day-desc');
  let specContent = '';
  articles.each((i, el) => {
    specContent += $(el).html() || '';
  });

  // Fetch puzzle input
  const inputResponse = await fetch(`${URL}/input`, {
    headers: {
      cookie: `session=${sessionCookie}`,
    },
  });

  if (!inputResponse.ok) {
    throw new Error(`Failed to fetch input for ${URL}: ${inputResponse.statusText}`);
  }

  const inputContent = await inputResponse.text();

  // Create directory and files
  const dayDirectory = resolve(__dirname, '..', 'src', YEAR.toString(), `day${dayString}`);
  await fs.mkdir(dayDirectory, { recursive: true });

  await fs.writeFile(resolve(dayDirectory, 'description.md'), specContent);
  await fs.writeFile(resolve(dayDirectory, 'input.txt'), inputContent.trim());

  console.log(`Successfully set up Year ${YEAR}, Day ${dayString}!`);
  console.log(`- Created directory: ${dayDirectory}`);
  console.log(`- Wrote description.md`);
  console.log(`- Wrote input.txt`);
}

const dayArg = process.argv[2];
if (!dayArg) {
  console.error('Please provide a day.');
  process.exit(1);
}

const day = parseInt(dayArg, 10);
if (isNaN(day) || day < 1 || day > 25) {
  console.error('Invalid day. Please provide a number between 1 and 25.');
  process.exit(1);
}

fetchDay(day).catch(error => {
  console.error(error);
  process.exit(1);
});


import fetch from 'node-fetch';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '.env') });

const year = process.argv[2];
const day = parseInt(process.argv[3], 10).toString();
const level = process.argv[4];
const answer = process.argv[5];

if (!year || !day || !level || !answer) {
  console.error('Usage: ts-node scripts/submit.ts <year> <day> <level> <answer>');
  process.exit(1);
}

const main = async () => {
  if (!process.env.AOC_SESSION_COOKIE) {
    console.error('AOC_SESSION environment variable not set.');
    return;
  }

  const response = await fetch(`https://adventofcode.com/${year}/day/${day}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': `session=${process.env.AOC_SESSION_COOKIE}`,
    },
    body: `level=${level}&answer=${answer}`,
  });

  if (!response.ok) {
    console.error(`Failed to submit answer: ${response.statusText}`);
    const body = await response.text();
    console.error('Response:', body);
    return;
  }

  const body = await response.text();
  
  if (body.includes('You gave an answer too recently')) {
    console.log('Too soon! Wait a bit before submitting again.');
  } else if (body.includes("That's not the right answer")) {
    console.log("That's not the right answer.");
  } else if (body.includes("That's the right answer!")) {
    console.log("That's the right answer! You've completed the puzzle.");
  } else {
    console.log('Unknown response:', body);
  }
};

main();

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const changelogPath = path.join(__dirname, '../CHANGELOG.md');

// 1. Get git log formatted as date and subject
let logOutput = '';
try {
  logOutput = execSync('git log --date=short --format="%ad|%s"', { encoding: 'utf8' });
} catch (error) {
  console.error('Error fetching git log:', error.message);
  process.exit(1);
}

const lines = logOutput.trim().split('\n').filter(Boolean);
const commitsByDate = {};

lines.forEach(line => {
  const [date, subject] = line.split('|');
  if (!commitsByDate[date]) {
    commitsByDate[date] = [];
  }
  commitsByDate[date].push(subject);
});

// 2. Read or initialize CHANGELOG.md
let currentContent = '';
if (fs.existsSync(changelogPath)) {
  currentContent = fs.readFileSync(changelogPath, 'utf8');
}

// Ensure the title exists
if (!currentContent.startsWith('# Changelog')) {
  currentContent = '# Changelog\n\n' + currentContent;
}

// 3. Update the changelog contents
let updatedContent = currentContent;

Object.keys(commitsByDate).forEach(date => {
  const dateHeading = `## ${date}`;
  const newItems = commitsByDate[date];

  if (!updatedContent.includes(dateHeading)) {
    // Insert new date heading and its commits at the top, right under the main title
    const bullets = newItems.map(item => `- ${item}`).join('\n');
    const newSection = `\n${dateHeading}\n${bullets}\n`;
    
    // Find index after "# Changelog"
    const titleEndIndex = updatedContent.indexOf('# Changelog') + '# Changelog'.length;
    updatedContent = updatedContent.slice(0, titleEndIndex) + '\n' + newSection + updatedContent.slice(titleEndIndex).trim();
  } else {
    // If heading exists, we can merge commits (only adding ones that aren't already listed as bullets)
    const linesOfFile = updatedContent.split('\n');
    const headingIndex = linesOfFile.findIndex(l => l.trim() === dateHeading);
    
    // Collect existing bullet points for this date until the next heading or empty line
    const existingBullets = new Set();
    let insertIndex = headingIndex + 1;
    for (let i = headingIndex + 1; i < linesOfFile.length; i++) {
      const line = linesOfFile[i].trim();
      if (line.startsWith('##')) break;
      if (line.startsWith('-')) {
        existingBullets.add(line.slice(1).trim());
        insertIndex = i + 1;
      }
    }

    const bulletsToAdd = newItems
      .filter(item => !existingBullets.has(item))
      .map(item => `- ${item}`);

    if (bulletsToAdd.length > 0) {
      linesOfFile.splice(headingIndex + 1, 0, ...bulletsToAdd);
      updatedContent = linesOfFile.join('\n');
    }
  }
});

// 4. Save file
fs.writeFileSync(changelogPath, updatedContent.trim() + '\n', 'utf8');
console.log('CHANGELOG.md updated successfully.');

const fs = require('node:fs/promises');
const path = require('node:path');

async function cleanup() {
  const staticDir = path.join(__dirname, '..', 'doc_build', 'static');

  let entries;
  try {
    entries = await fs.readdir(staticDir, { withFileTypes: true });
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      return;
    }
    throw error;
  }

  const deletions = entries
    .filter((entry) => entry.isFile() && /^search_index(\..+)?\.json$/.test(entry.name))
    .map((entry) => fs.unlink(path.join(staticDir, entry.name)));

  await Promise.all(deletions);
}

cleanup().catch((error) => {
  console.error('Failed to remove generated search index files.');
  console.error(error);
  process.exitCode = 1;
});

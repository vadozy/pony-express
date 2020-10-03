const readBody = req =>
  new Promise(resolve => {
    let chunks = [];
    req.on('data', chunk => {
      process.stdout.write(`Chunk: ${chunk.toString()}`);
      chunks.push(chunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
  });

module.exports = readBody;

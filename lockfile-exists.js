#!/usr/bin/env node
const fs = require('node:fs');

try {
  fs.accessSync('package-lock.json');
  process.exit(0);
} catch (error) {
  process.exit(1);
}

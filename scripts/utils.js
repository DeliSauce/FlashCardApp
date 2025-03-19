#!/usr/bin/env node

import fs from 'fs';

export const FILES = {
  getStoredData: async (filename) => {
    const data = await fs.readFileSync(filename, 'utf8');
    // const webpage = await Buffer.from(data);
    return data;
  },
  save: async (filename, data) => {
    await fs.writeFileSync(filename, data);
  },
  rename: async (oldPath, newPath, CB = () => {}) => {
    await fs.rename(oldPath, newPath, CB)
  },
  getTimeModified: (path) => {
    let time;
    try {
        time = fs.statSync(path).mtime;
    } catch (error) {
        console.log(error)
    }
    return time;
  }
};
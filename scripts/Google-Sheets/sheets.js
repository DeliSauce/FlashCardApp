#!/usr/bin/env node

// https://developers.google.com/sheets/api/quickstart/nodejs

// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');
// const {google} = require('googleapis');


import * as fs from 'fs/promises';
import * as path from 'path';
import * as process from 'process';
import { authenticate} from '@google-cloud/local-auth';
import {google} from 'googleapis';
import {FILES} from '../utils.js';
import { log } from 'console';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), '../../token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), '../../credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}


/**
 * Console logs the flash card data:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listFlashcards(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1WAsIrp17aEJjcSxWwTWZhflrPif7zWi14-lIp-6YE1U',
    range: 'cards!A1:F',
  });
  const rows = res.data.values;
  // console.log(rows, typeof rows)
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }

  rows.forEach((row) => {
    // Print 
    console.log(`${row[0]} | ${row[1]} | ${row[2]} | ${row[3]}`);
  });

  const tt = async (err, stat) => {
    
  }

  const timestamp = FILES.getTimeModified(`../../assets/data/current.json`);

  if (timestamp) {
    await FILES.rename(
      `../../assets/data/current.json`, 
      `../../assets/data/${timestamp}.json`
    ).catch((error) => console.log(error));
  }
  await FILES.save(`../../assets/data/current.json`,JSON.stringify(rows) );
}


authorize().then(listFlashcards).catch(console.error);
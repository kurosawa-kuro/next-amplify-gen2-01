'use client';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../amplify_outputs.json';
import { Schema } from '../amplify/data/resource';

Amplify.configure(config, { ssr: true });

export const client = generateClient<Schema>(); 
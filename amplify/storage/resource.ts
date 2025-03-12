import { defineStorage } from '@aws-amplify/backend-storage';

export const storage = defineStorage({
  name: 'micropost-images',
  access: (allow) => ({
    'microposts/*': [
      allow.guest.to(['read', 'write', 'delete'])
    ]
  })
});
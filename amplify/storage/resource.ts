import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
    name: 'microposts',
    access: (allow) => ({
        'public/*': [
            allow.authenticated.to(['write', 'read']),
            allow.guest.to(['write', 'read'])
        ]
    })
})
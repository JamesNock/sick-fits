import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import 'dotenv/config';
import {
    withItemData,
    statelessSessions,
} from '@keystone-next/keystone/session';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30 /* 30 days */,
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        /* TODO add initial roles */
    },
});

export default withAuth(
    config({
        server: {
            cors: {
                origin: [process.env.FRONTEND_URL],
                credentials: true /* pass along cooke defined above */,
            },
        },
        db: {
            adapter: 'mongoose',
            url: databaseURL,
            /* TODO add data seeding here */
        },
        lists: createSchema({
            /* schema items go in here */
            User,
        }),
        ui: {
            /* Show UI only for people who pass this test */
            isAccessAllowed: ({ session }) => !!session?.data,
        },
        /* TODO add session values here */
        session: withItemData(statelessSessions(sessionConfig), {
            User: 'id',
        }),
    })
);

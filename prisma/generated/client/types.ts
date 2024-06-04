import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
};
export type OAuthAccount = {
    providerId: string;
    providerUserId: string;
    userId: string;
    created_at: Generated<Timestamp>;
};
export type Session = {
    id: string;
    user_id: string;
    expires_at: Timestamp;
};
export type User = {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Timestamp | null;
    image: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type DB = {
    Account: Account;
    OAuthAccount: OAuthAccount;
    Session: Session;
    User: User;
};

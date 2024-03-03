# App

Gympass style app.

## Functional Requirements

- [x] User must be able to create an account.
- [x] User must be able to login.
- [x] It must be possible to obtain profile from a logged user.
- [x] It must be possible to obtain number of check-ins from a logged user.
- [x] It must be possible for a user to obtain his check-in history.
- [x] It must be possible for a user to search for gyms (up to 10km).
- [x] It must be possible for a user to search for gyms by name.
- [x] It must be possible for a user check-in to a gym.
- [x] It must be possible to validate a check-in for a user.
- [x] It must be possible to register a gym.

## Business rules

- [x] A user must not be allowed to register with duplicated email.
- [x] A user must not be allowed to check-in twice in a day.
- [x] A user must not be allowed to check-in if he is not (100m) from the gym.
- [x] Check-in can only be validated up to 20 minutes after it is created
- [ ] Check-in can only be validated by an admin.
- [ ] A gym can only be registered by an admin.

## Non-functional Requirements

- [x] The password must be encrypted.
- [x] Data must be stored in a relational database (Postgres).
- [x] Every list of data must be paginated with 20 items per page.
- [ ] The user must be identified by a JWT token.


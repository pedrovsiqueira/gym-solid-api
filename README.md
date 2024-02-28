# App

Gympass style app.

## Functional Requirements

- [x] User must be able to create an account.
- [ ] User must be able to login.
- [ ] It must be possible to obtain profile from a logged user.
- [ ] It must be possible to obtain number of check-ins from a logged user.
- [ ] It must be possible for a user to obtain his check-in history.
- [ ] It must be possible for a user to search for gyms.
- [ ] It must be possible for a user to search for gyms by name.
- [ ] It must be possible for a user check-in to a gym.
- [ ] It must be possible to validate a check-in for a user.
- [ ] It must be possible to register a gym.

## Business rules

- [x] A user must not be allowed to register with duplicated email.
- [ ] A user must not be allowed to check-in twice in a day.
- [ ] A user must not be allowed to check-in if he is not (100m) from the gym.
- [ ] Check-in can only be validated up to 20 minutes after it is created
- [ ] Check-in can only be validated by an admin.
- [ ] A gym can only be registered by an admin.

## Non-functional Requirements

- [x] The password must be encrypted.
- [ ] Data must be stored in a relational database (Postgres).
- [ ] Every list of data must be paginated with 20 items per page.
- [ ] The user must be identified by a JWT token.


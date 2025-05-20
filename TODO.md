# App

GymPass style App.

#### 1 - Functional Requirements - FRs

- [x] It must be possible to register;
- [x] It must be possible to authenticate (JWT in NFRs is missing to implement);
- [x] It must be possible to obtain the profile of a logged-in user;
- [ ] It must be possible to obtain the number of check-ins made by the logged-in user;
- [ ] It must be possible for the user to obtain their check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check-in at a gym;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register a gym.

#### 2 - Business Rules - BRs

- [x] The user must not be able to register with a duplicate email;
- [ ] The user must not be able to do 2 check-ins on the same day;
- [ ] The user must not be able to do check-in if not near (100m) the gym;
- [ ] Check-in can only be validated up to 20 minutes after created;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

#### 3 - Non-Functional Requirements NFRs

- [x] The user's password needs to be encrypted;
- [x] Application data needs to be persisted in a Postgres database;
- [ ] All data lists need to be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token)

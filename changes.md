*Harrison was here* -- *Aaron Says Thanks!*

* 
# Stuff I did

## Edits and Fixes
- Removed the `process.exit(1)` at the bottom of postgres.js, this was causing errors (you don't need to exit the process) ✔
- Moved some password/username details into .env to keep them safe ✔
- Added an `id` column to the announcements table to differentiate the different announcements *❌ -- Changed to autoIncrement in the database itself, but still a very good idea!*
- Added some error logging to getAnnouncements and exported it (at the bottom) ✔
- Changed node postgres.js to node server.js in package.json so the main server file starts instead of just the database ✔
- Included postgres.js into server.js and added body-parser and cookie-parser to express. ✔
- Added/Updated apis to have one get all announcements and another just get single announcements via the `id` ✔
- Removed dotenv from server.js, glitch automatically adds the .env data to process.env ✔
- Added an `addAnnouncement` function to create new announcements ✔
- Made a ui to create an announcement located at https://node-js-api.glitch.me/create or in the /views folder here on glitch ✔ -- Thanks! I've been wanting to do this :)

**Absolutely, absolutely no worries if you want to revert or improve any of these edits**

## Suggestions
- Add a `time` column to the database to keep track of when an announcement was created. (this can be set automatically) ✔
- Add an `expiration` column to the database to keep track of when an annoucement should be removed ➖ *mabye*
- Using `node-cron` from npm, schedule a function to run every day to clear out expired announcements. ➖
- Implement this into your bell schedule - perhaps add an X button so users can hide an announcement 
  you could store the `id` in localStorage so you know which ones to hide. *I think if we just load in the latest 5 or so, this wouldn't be needed.
- Update the database with some more tables, perhaps a `schedules` table with the school schedules. I'd like to start
  working on a new bell-schedule with better css, ui, and features - perhaps it could help with the new database. ✔ -- Implemented, What colums do you want me to add to the table? I can also make a table for your version of the bell schedule if you want me to
  
  
**No worries if you don't want to implement these; they're just some of my ideas**

Overall, great work! It's great to see how much great work you've done. I've never used postresql before, but it
looks awesome. I'm super tired of sqlite, but I can't quite find a good solution, postresql seems perfect. 

---

# Server docs
# **Moved to the home site and /api

## GET /api/announcements
 - Get all announcements on the database
 - No Parameters

## GET /api/announcements/[id]
 - Get the announcement with that Id
 - id parameter - the id of the desired announcement

## POST /api/announcements
 - Add an announcement to the database
 - Form can be found at https://node-js-api.glitch.me/create which can do this request
 - title parameter - the announcement title
 - description parameter - the description of the announcement
 - tags parameter - comma-seperated list of tags for the announcment
 - password parameter - the admin password as shown in .env
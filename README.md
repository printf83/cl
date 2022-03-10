# cl

1. npm install
2. npm run build
3. touch .env
4. echo -e
   "PORT=<value>\nDBURL=<value>\nSESSIONSECRET=<value>\nEMAILPROVIDER=<value>\nEMAILADDRESS=<value>\nEMAILPASSWORD=<value>" >>
   .env
5. npm start

-   # example .env file

*   PORT=8888
*   DBURL=mongodb+srv://username:server/db?retryWrites=true&w=majority
*   SESSIONSECRET=super-secret-session
*   EMAILPROVIDER=gmail
*   EMAILADDRESS=example@example.com
*   EMAILPASSWORD=email-address-password

-   # test server
    https://bs5-js-builder.herokuapp.com/

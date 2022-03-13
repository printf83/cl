# cl

1. npm install
2. npm run build
3. touch .env
4. echo -e
   "PORT=<value>\nDBURL=<value>\nSERVERURL=<value>\nSESSIONSECRET=<value>\nSESSIONEXPIRED=<value>\nHASHSALT=<value>\nEMAILPROVIDER=<value>\nEMAILADDRESS=<value>\nEMAILPASSWORD=<value>" >>
   .env
5. npm start

-   # example .env file

*   PORT=8888
*   DBURL=mongodb+srv://username:server/db?retryWrites=true&w=majority
*   SERVERURL=http://localhost:8888
*   HASHSALT=10
*   SESSIONSECRET=super-secret-session
*   SESSIONEXPIRED=2h
*   EMAILPROVIDER=gmail
*   EMAILADDRESS=example@example.com
*   EMAILPASSWORD=email-address-password

-   # test server
    https://bs5-js-builder.herokuapp.com/

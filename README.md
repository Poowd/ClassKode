# CLASS KODE DEVELOPMENT LOGBOOK

> [!NOTE]
> CREATE A SYSTEM MANUAL IN SETTING UP THE APPLICATION
> CREATE A STABLE WEB HOSTING FOR THE FOLLOWING:
>
> 1. CLIENT SIDE
> 2. SERVER SIDE
> 3. DATABASE (MYSQL)
>    USER LEVEL MANUAL
>    SYSTEM LEVEL MANUAL

## LOGBOOK FOR WEB-APPLICATION DEVELOPMENT ( LBWD )

### LOG ENTRY 1 - 16/06/2024

1. STARTING TO OVERHAUL THE OVERALL SYSTEM
2. RESTORE THE NEW SYSTEM TO WORKING PROTOTYPE OF THE PREVIOUS CLASS KODE
3. CHANGES THE ICONS USED, NOW WILL BE USING REACT ICONS INSTEAD OF DOWNLOADING PNG FILES
4. MAJOR CHANGES FROM THE DASHBOARD SETUP HAVING FOUR (4) CARD CONTAINER CONTAINING TITLE, CONTENT, ALERT, AND A VIEW BUTTON.
5. INCLUDED THREE (3) GRAPHICAL GRAPHS.
6. SYSTEM’S RESPONSIVENESS UNTO ANY DEVICES ARE ATLEAST EIGTHY (80) PERCENT, SOME MAJOR PROBLEMS ARE THE HEADER, FINDING A WAY TO ATLEAST MAKE THE TEXT BE STATIC JUST LIKE THE NAVIGATION BAR / TOP BAR.
7. INITIALLY START UPDATING THE LAYOUT AND HOW EACH LAYOUT IS PASSED UNTO EACH MODULE.
8. RESOLVING THE ROUTES PROBLEM WITH MULTIPLE USER LEVEL.
9. FILE MANAGEMENT ARE ORGANIZED SEPARATING EACH TYPE OF FILE BOTH CLIENT AND SERVER SIDED.
10. IMPROVE ALL TEMPLATE LAYOUT FOR EACH MODULES.
11. FILE MAINTAINANCE MODULES ARE WORKING PROPERLY, FUNCTIONALITIES WILL BE FORMED AS THE FOLLOWING:
   - CREATE AND VIEW
   - UNDER VIEW IS THE EDIT AND ARCHIVE
12. REVERTING THE TO OLDEST METHOD FOR THE CRUD FUNCTIONALITY (PER MODULE SETUP)
13. PASSING OF DATA WILL BE DONE USING THE LINK REACT TAG HAVING THE PARAMETERS OF TO AND STATE, STATE WILL CONTAIN THE OBJECT RATHER SEPARATED DATA. TO ACCESS THIS, IT WILL BE PASSED UNTO A STATE AND THAT STATE WILL BE THE TEMPORAL STORAGE OF THE DATA.
14. PASSING OF DATA WILL BE DONE USING THE LINK REACT TAG HAVING THE PARAMETERS OF TO AND STATE, STATE WILL CONTAIN THE OBJECT RATHER SEPARATED DATA. TO ACCESS THIS, IT WILL BE PASSED UNTO A STATE AND THAT STATE WILL BE THE TEMPORAL STORAGE OF THE DATA.
15. DATABASE IS ALSO REDO, MOST OF THE FORMAT IS THE SAME BUT THE ID WILL BE LENGTH OF TEN (10), ALL ATTRIBUTES THAT MAY CHANGE WILL BE SUBJECTED AS AN ENTITY SUCH AS COMPONENT, ACADEMIC LEVEL, AND MORE.

### LOG ENTRY 2 - 17/06/2024

1. CREATED THE NEW FORMS STRUCTURE INCLUDING DIFFERENT COMPONENTS.
2. CREATE, EDIT AND VIEW FORMS WITHOUT THE FUNCTIONALITY.
3. OPTIMIZE THE USAGE OF EACH COMPONENTS ESPECIALLY THE DROPDOWN, INPUT, RADIO BUTTON, AND MULTI INPUT IN SINGLE LINE.
4. FORMATTING FOR EACH OF THE FORM COMPONENT TO ORGANIZE AND BE ALIGNED.
5. NAVIGATION BUTTONS FOR EACH FORMS, INCLUDING SUBMIT BUTTON, ARCHIVE BUTTON, AND EDIT BUTTON ARE ESTABLISHED.
6. THE USE OF LINK AND STATE UNTO THE EDIT BUTTON TO FILL OUT THE BLANK FORM INPUTS INCLUDING THE CURRENT SELECT / DROPDOWN AND CURRENT RADIO.
7. SET THE FORMATTING FOR THE VIEW MODULE.
8. NO DATA BASE MOVEMENT BUT IS USED TO SET UP SAMPLE DATA FOR BASIC TESTING.
9. SETUP FOR THE REACT JS COMPONENTS SUCH AS THE RADIO BUTTON, SELECT, AND INPUT TAG WORKS AS A MUTABLE STATE DATA.
10. HOOK FOR CHANGING OF DATA IS CONNECTED, USABLE BY ALL OF THE FOLLOWING JS COMPONENTS:
   -   RADIO BUTTON
   -   SELECT / DROPDOWN BUTTON
   -   INPUT TAG ( ANY TYPE )
11. FIXES FOR SOME OF THE UI COMPONENTS.
12. CHANGES FROM THE KANBAN, UPDATE EACH ON GOING TASK INCLUDING CHECKBOXES TO TRACK THE PROGRESS ( TRELLO ).
13. ADDED A SYSTEM SETUP FOR WEB-APPLICATION DEVELOPMENT.

### LOG ENTRY 3 - 18/06/2024

1. MOSTLY FOCUSES ON THE FORM VALIDATION.
2. USE HOOKS TO CREATE A GLOBAL VALIDATION THAT CAN BE REUSED WITH THE APPLICATION FORMS, THIS WILL BE A GENERIC FUNCTIONS THAT SHOULD BE ABLE TO SATISFY VALIDATIONS FOR THE APPLICAITON.
3. THIS WILL ALSO INCLUDE STATES, RESULTS, MESSAGES, AND FEEDBACKS.
4. ADDED UI CAPABILITIES TO DETECT WHETHER AN INPUT IS INVALID OR NOT ONSUBMIT.
5. VALIDATION TESTING FOR EACH CREATED VALIDATION FORMS OR FUNCTIONALITIES.
6. THE FOLLOWING ARE THE VALIDATIONS CREATED:
  -   LENGTH ( MIN, MAX )
  -   RANGE ( MIN, MAX )
  -   PHONE NUMBER ( 09 )
  -   INVALID CHARACTER ( APPLICAITON DEFINED )
  -   NUMERICAL DATA 

### LOG ENTRY 4 - 19/06/2024

1. MAJOR CHANGES WITHIN THE DATABASE.
2. DATABASE NORMALIZATION AND ADDING NEW TABLES COMPARE THE THE PAST VERSION OF DATABASE.
3. DATA SUCH AS THE FOLLOWING, ARE ADDED AS A TABLE INSTEAD OF CONSTANT OR ENUM VALUES:
   -   ASSIGNMENT
   -   SPECIALIZATION
   -   PROJECTION
   -   COACH TYPE
   -   BUILDING
   -   FLOOR
   -   FACILITY
4. USE THE NEW WAY OF DATA RETRIEVING AND USING DATABASE QUERIES.
5. FIX VALIDATION UI ISSUES, THIS WILL BE TRIGGER UPON ENTRYING CHARACTERS WITHIN THE FORMS.
6. FIX DATABASE TABLES CONNECTIONS AND RELATIONS.
7. FIX DATABASE TABLES NORMALIZATION.
8. USING DATABASE TABLE CODE AS AN ATTRIBUTE INSTEAD OF ID, ID'S ARE GOING TO BE USED AS NUMBERING SYSTEM FOR ENTRIES.
9. TABLE ATTRIBUTES WILL CARRY CURRENT TIMESTAMP AS DEFAULT FOR CREATED, AND STATUS:
    -   ACTIVE ( VISIBLE UNTO THE APPLICATION )
    -   ARCHIVE ( HIDDEN BUT NOT DELETED ENTRIES )
    -   PENDING ( THIS WILL BE SET UPON REQUEST FROM LOWER USER LEVEL ( SPECIAL PERMISSION FOR COACHES ) )

### LOG ENTRY 5 - 20/06/2024

1. FIXES FROM THE DATABASE DESIGN AND ATTRIBUTES INCLUING THE NORMALIZATION.
2. FIX VALIDATION FOR UI AND FORM CHECKING, ADDED A DUPLICATE, CODEID, CODE, ETC.
3. ADDED MODAL COMPONENT AND MODAL HOOK. GENERAL DESIGN.
4. FINALIZE THE FORMS FOR THE COACH:
  -   CREATE
  -   UPDATE
  -   ARCHIVE + MODAL CONFIRMATION
5. CHANGES BUTTON COLORS ACCORDING TO THE PURPOSE.
6. UPDATE DATABASE TABLE RELATIONSHIPS.
7. ADDED VIEW FOR THE DEPARTMENT, BUT NOT FULLY MODIFIED FOR EDIT AND ARCHIVE BUTTONS.

### LOG ENTRY 6 - 21/06/2024

1. UPDATES FOR THE MODULE PAGES.
2. UPDATED ALL MODULE PAGES VIEW WHICH NOW INCLUDES ARCHIVING FUNCTIONALITY WITH CONFIRMATION:
   -   DEPARTMENT
   -   PROGRAM
   -   COAHES
   -   COURSES
   -   ROOMS
   -   SECTIONS
3. NEW FIXES FOR BUGGY FORMS AND VALIDATION.
4. NEW AND UPDATED HOOKS:
   -   USE DATABASE
   -   USE VALIDATE
   -   USE ARCHIVE ENTRY
5. USE GET AND USE POST HOOK IS COMPRESSED INTO USE DATABASE HOOK WITHOUT STATE INSIDE ( USABLE BY ALL WITHIN A PAGE ).
6. USE VALIDATE WILL HANDLE ALL VALIDATION ACROSS THE PAGES.
7. USE ARCHIVEENTRY WILL HANDLE ALL ARCHIVING LOGICS
8. UPDATE THE DATABASE AND RELATIONSHIPS WITH THE FOLLOWING NEW TABLES:
   -   SETUP
   -   ACADEMIC LEVEL
   -   SEMESTER
   -   YEAR LEVEL
   -   COURSE COMPONENT
9. UPDATED SERVER QUERIES WHICH MOSTLY INCLUDES:
   -   VIEW
   -   ARCHIVE
   -   UPDATE
   -   CREATE
10. EACH QUERIES INCLUDES ALL POSSIBLE JOINS, CONDITIONS, AND ARRANGEMENT.
11. ADDED NEW CREATE MODULE, DEPARTMENT.
12. UPDATED ENTITY ATTRIBUTE AND PROPERTIES.
13. SOURCE CODE CLEANING AND OPTIMIZATION.
14. UPDATED COACH VIEW MODULE WHICH NOW SHOWS THE FOLLOWING:
    -   STATUS
    -   SPECIALIZED COURSES
    -   ASSIGNMENT HISTORY
    -   SPECILIZED COURSES HISTORY
15. TWO NEW COMPONENTS:
    -   VIEW CARD
    -   LIST CARD

## SYSTEM MANUAL FOR WEB-APPLICATION DEVELOPMENT ( SMWD )

### SYSTEM SETUP FOR WEB-APPLICATION DEVELOPMENT

1. REQUIREMENTS:
   -   VISUAL STUDIO CODE ( VSCODE )
   -   XAMPP
   -   NODE JS ( LTS V.18 + )
   -   GITHUB ACCOUNT
   -   GITHUB DESKTOP ( OPTIONAL: FOR CONVINIENCE )
   -   BROWSER ( OPERA GX / GOOGLE CHROME / MICROSOFT EDGE / BRAVE BROWSER )
2. TECHNOLOGIES:
   -   HTML, CSS, & JAVASCRIPT
   -   REACT JS
   -   NODE JS LTS V.18 +
   -   NODE EXPRESS
   -   BOOTSTRAP 5.3.3
   -   MYSQL
3. UTILITIES:
   -   COLOR PICKER
   -   REACT ICONS
   -   BOOTSTRAP DOCUMENTATION
   -   FIGMA
   -   DRAW.IO
4. SETUP FOR THE WEB-APPLICATION ( FOLLOW THE STEPS IN ORDER )
   1. LOGIN ALL NECESSARY ACCOUNTS THAT WILL BE NEEDING:
      -   GITHUB
   2. VALIDATE IF ALL MENTIONED ABOVE ARE AVAILABLE AT YOUR DISPOSAL
   3. IF READY, PROCEED
   4. CLONE THE GITHUB REPOSITORY FOR THE WEB-APPLICATION
      -   USERNAME : POOWD
      -   REPOSITORY : CLASS KODE
   5. ONCE DONE, ACCESS IT THROUGH THE FOLLOWING BY CLICK THE ' CODE ' BUTTON ( DISTINCTIVE GREEN BUTTON )
      -   DIRECTLY USE VSCODE ( OPEN WITH VISUAL STUDIO CODE )
      -   USE GITHUB DESKTOP
   6. PULL THE REPOSITORY FROM YOUR DEVICE
   7. OPEN THE REPOSITORY USING VSCODE
   8. CHECK WHETHER BOTH CLIENT FOLDER AND SERVER FOLDER ARE AVAILABLE
   9. SETUP THE ROOT FOLDER
       -   COMMAND ( CTRL + SHIFT + ~ ) TO OPEN TERMINAL
       -   OR ACCESS TERMINAL BY USING THE TOPBAR
       -   ONCE DONE, CREATE A NEW TERMINAL AND TYPE ( npm i ) / ( npm install )
   10. SETUP THE CLIENT FOLDER
       -   COMMAND ( CTRL + SHIFT + ~ ) TO OPEN TERMINAL
       -   OR ACCESS TERMINAL BY USING THE TOPBAR
       -   ONCE DONE, CREATE A NEW TERMINAL AND TYPE ' cd client '
       -   THEN TYPE ( npm i ) / ( npm install )
       -   ADD THE FOLLOWING DEPENDENCIES:
         -   AXIOS ( npm i axios )
         -   CHARTJS ( npm i chartjs )
         -   NOTE: IF DID NOT WORK ? CHECK THEIR RESPECTIVE DOCUMENTATION
   11. SETUP THE SERVER FOLDER
       -   COMMAND ( CTRL + SHIFT + ~ ) TO OPEN TERMINAL
       -   OR ACCESS TERMINAL BY USING THE TOPBAR
       -   ONCE DONE, CREATE A NEW TERMINAL AND TYPE ' cd server '
       -   THEN TYPE ( npm i ) / ( npm install )
       -   ADD THE FOLLOWING DEPENDENCIES:
         -   AXIOS ( npm i axios )
         -   NOTE: IF DID NOT WORK ? CHECK THEIR RESPECTIVE DOCUMENTATION
   12. RUN THE FOLLOWING SIDES TO BECOME AN APPLICATION:
       -   ACCESS XAMPP CONTROL PANEL AND SWITCH THE FOLLOWING:
         -   APACHE
         -   MYSQL
       -   CREATE A NEW TERMINAL AND TYPE ( npm run server )
       -   CREATE A NEW TERMINAL AND TYPE ( npm run client )
       -   WAIT FOR THE WHOLE WEB-APPLICATION FORM
       -   IF IT WILL NOT WORK, TYPE ' rs ' FROM THE SERVER TERMINAL IF IT IS SERVER SIDED ISSUES
       -   IF CLIENT SIDED, DELETE THE CLIENT SIDE TERMINAL AND START A NEW ONE
   13. THIS SHOULD WORK, IF NOT HEAD'S UP, CALL US WHENEVER YOU NEED HELP

### SYSTEM USER MANUAL FOR WEB-APPLICATION

## LOG ENTRY IMAGES

![image](https://github.com/Poowd/ClassKode/assets/121615238/28c46259-c92a-40bb-850c-6c86a8f9bbb2)
![image](https://github.com/Poowd/ClassKode/assets/121615238/482480c9-9b50-41de-99fd-0545d4a9fe38)
![image](https://github.com/Poowd/ClassKode/assets/121615238/080e02fb-1977-4954-932e-4bb1a6775d7d)
![image](https://github.com/Poowd/ClassKode/assets/121615238/80e90011-e5a7-495e-8732-aeeae3009e02)
![image](https://github.com/Poowd/ClassKode/assets/121615238/a92f51a7-f5f9-4064-9964-20f37f5e5f11)
![image](https://github.com/Poowd/ClassKode/assets/121615238/308e7af3-2a77-4d6b-a962-a79fb4d361b7)
![image](https://github.com/Poowd/ClassKode/assets/121615238/f9842fa0-df55-479a-9d2c-617f91c139a5)
![image](https://github.com/Poowd/ClassKode/assets/121615238/9f315765-3a1c-4f54-9517-52191dd0a6d0)
![image](https://github.com/Poowd/ClassKode/assets/121615238/8e2a1b5e-d449-45a8-ad3b-0e52a63380bc)
![image](https://github.com/Poowd/ClassKode/assets/121615238/df2c51d6-dfbc-48c9-99ed-1654fce0976b)
![image](https://github.com/Poowd/ClassKode/assets/121615238/e45aa3e3-f7b7-4b73-b4da-14f455eaad5e)
![image](https://github.com/Poowd/ClassKode/assets/121615238/7f218986-2bc0-4dee-b011-9fd1989611d3)
![image](https://github.com/Poowd/ClassKode/assets/121615238/910a05c7-2f3c-42b8-a14d-7e0c69583ec1)
![image](https://github.com/Poowd/ClassKode/assets/121615238/d1c1b125-c38a-4906-bc42-254914c62c35)
![image](https://github.com/Poowd/ClassKode/assets/121615238/39b91bff-1289-4350-aaa6-58dde2c63543)
![image](https://github.com/Poowd/ClassKode/assets/121615238/1fb6d782-e63e-49d4-a229-e615d84594c0)
![image](https://github.com/Poowd/ClassKode/assets/121615238/a3212f5f-e1aa-4368-a7c1-95f2554d4950)
![image](https://github.com/Poowd/ClassKode/assets/121615238/492eb3b0-5323-4dd5-ae63-e9a3406b0df2)
![image](https://github.com/Poowd/ClassKode/assets/121615238/f8cfdefa-6974-425d-8218-38fe5e30f89a)
![image](https://github.com/Poowd/ClassKode/assets/121615238/0fb37df0-5f87-46bf-8175-8e94ca8ae954)
![image](https://github.com/Poowd/ClassKode/assets/121615238/a244a2fd-825d-471f-b39f-f7038b1c47fe)


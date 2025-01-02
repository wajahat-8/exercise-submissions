sequenceDiagram
participant browser
participant server
browser->>server:POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate server
server-->>browser:302 Redirect
 deactivate server
 browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/notes
 activate server
 server-->>browser:Html document
 deactivate server
 browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/main.css
 activate server
 server-->>browser:CSS file
 deactivate server
  browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/main.js
 activate server
 server-->>browser:js file
 deactivate server
   browser->>server:GET https://studies.cs.helsinki.fi/exampleapp/data.json
 activate server
 server-->>browser:json file file
 deactivate server



# CommonJS

Module loading is synchronous

Node.js can block while reading modules from the file system

Uses require()

Suitable for server-side

# ES Modules (ESM / module.js)

Module loading is asynchronous

Blocking is not allowed (designed for browsers)

Uses import / export

Supports parallel loading

# mvp structure

controller :- bussiness logic
models :- schema/tables
router :- endpoints
config :- db config
.env :- keys,url
server.js :- making server

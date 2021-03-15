"use strict";

// more-or-less the example code from the hapi-pino repo
var hapi = require("@hapi/hapi");

var _require = require("mongodb"),
    MongoClient = _require.MongoClient;

var url = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017";
var dbName = "dockerApp";
var collectionName = "count";

function start() {
  var client, db, collection, server;
  return regeneratorRuntime.async(function start$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(MongoClient.connect(url));

        case 2:
          client = _context3.sent;
          db = client.db(dbName);
          collection = db.collection(collectionName);
          server = hapi.server({
            host: "0.0.0.0",
            port: process.env.PORT || 3000
          });
          server.route({
            method: "GET",
            path: "/",
            handler: function handler() {
              var count;
              return regeneratorRuntime.async(function handler$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return regeneratorRuntime.awrap(collection.count());

                    case 2:
                      count = _context.sent;
                      return _context.abrupt("return", {
                        success: true,
                        count: count
                      });

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            }
          });
          server.route({
            method: "GET",
            path: "/add",
            handler: function handler() {
              var res;
              return regeneratorRuntime.async(function handler$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return regeneratorRuntime.awrap(collection.insertOne({}));

                    case 2:
                      res = _context2.sent;
                      return _context2.abrupt("return", {
                        inserted: res.insertedCount
                      });

                    case 4:
                    case "end":
                      return _context2.stop();
                  }
                }
              });
            }
          });
          _context3.next = 10;
          return regeneratorRuntime.awrap(server.register({
            plugin: require("hapi-pino"),
            options: {
              prettyPrint: true
            }
          }));

        case 10:
          _context3.next = 12;
          return regeneratorRuntime.awrap(server.start());

        case 12:
          return _context3.abrupt("return", server);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  });
}

start()["catch"](function (err) {
  console.log(err);
  process.exit(1);
});
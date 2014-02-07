#!/usr/bin/python

import tornado.web
import tornado.websocket
import tornado.ioloop

from tornado.escape import json_decode


class WebSocketHandler(tornado.websocket.WebSocketHandler):

    def open(self):
        print "New client connected"
        self.write_message("You are connected")

    def on_message(self, message):
        data = json_decode(message)
        try:
            if data.get('type') == 'sqr':
                message = int(data.get('number'))
                message = str(message * message)
            elif data.get('type') == 'add':
                message = int(data.get('number'))
                message = str(message + message)
        except ValueError:
            message = 'No habia un numero entero en ese objeto'
        self.write_message(message)

    def on_close(self):
        print "Client disconnected"


application = tornado.web.Application([
    (r"/", WebSocketHandler),

])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()

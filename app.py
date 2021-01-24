from flask import Flask, request, send_from_directory
from flask_socketio import SocketIO
import os
from threading import Thread
from pathlib import Path

class App():
    def __init__(self):
        self.app = Flask(__name__)
        self.socket = SocketIO(self.app)

        thread = Thread(target = self.init_socket)
        thread.start()

        self.next_player_uid = 1
        self.player_count = 0

        self.init_site()

    def init_site(self):
        self.app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
        @self.app.route('/')
        def root():
            with open("src/index.html", "rt", encoding="utf-8") as file:
                return file.read()

        @self.app.route('/js/<path:path>')
        def js_path(path):
            return send_from_directory('src/js', path)
        
        @self.app.route('/addons/<path:path>')
        def addons_path(path):
            return send_from_directory('src/addons', path)

        @self.app.route('/css/<path:path>')
        def css_path(path):
            return send_from_directory('src/css', path)
    
    def get_local_files(self):
        result = list(Path("src").rglob("*.*"))
        result = list(map(lambda p: str(p).replace("\\", "/")[len("src"):], result))
        return result
        # return list(map(lambda f: path + f, os.listdir("src")))

    def init_socket(self):

        @self.socket.on('client_connect')
        def handle_client_connect(data):
            self.socket.emit('server_connect', {
                'local_files': self.get_local_files(),
                'player_uid': self.next_player_uid,
                'is_server': self.player_count==0,
            })
            
            self.player_count+=1
            self.next_player_uid+=1
            print(self.player_count)

        @self.socket.on('client_disconnect')
        def handle_client_disconnect(data):
            self.socket.emit('server_disconnect', {
                'player_uid': data["player_uid"],
            })
            
            self.player_count-=1
            print(self.player_count)

        @self.socket.on('client_broadcast')
        def handle_client_broadcast(data):
            self.socket.emit('server_broadcast', data)

        self.socket.run(self.app, host='0.0.0.0', port=3000)
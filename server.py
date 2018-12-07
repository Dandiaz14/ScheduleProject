from flask import Flask, request, make_response, jsonify
import mysql.connector
from usuario import Usuario
from contacto import Contact
from agenda import Echauri

conexion = mysql.connector.connect(user="dan",
						   password="12345",
						   database="agenda")
cursor = conexion.cursor()	   

app = Flask(__name__)

@app.route("/home/")
def hello():
	respuesta = make_response("Hello World!")
	respuesta.headers.add('Access-Control-Allow-Origin','*')
	return respuesta

@app.route("/login/",methods=['GET'])
def login():
	usuario = request.args.get('usuario')
	contra = request.args.get('password')
	userDB = Usuario(conexion,cursor)
	respuesta = make_response(str(userDB.login(usuario, contra)))
	respuesta.headers.add('Access-Control-Allow-Origin','*')
	return respuesta
	
@app.route("/agenda/",methods=['GET'])
def agenda():
	echa = Echauri(conexion,cursor)
	usuario = request.args.get('usuario')
	password = request.args.get('password')

	resultado = echa.apivergas(usuario,password)
	print(resultado)

	return jsonify(resultado)

@app.route("/contact/",methods=['GET'])
def contacto():
	id_user = request.args.get('id')
	c = Contact(conexion,cursor)
	resultado = c.buscar(id_user)
	print(resultado)

	return jsonify(resultado)

@app.route("/nuevo/",methods=['GET'])
def nuevoUsuario():
	usuario = request.args.get('usuario')
	password = request.args.get('password')
	nameC = request.args.get('name')
	phoneC = request.args.get('phone')
	mailC = request.args.get('mail')
	faceC = request.args.get('facebook')
	twiC = request.args.get('twitter')
	instC = request.args.get('instagram')
	c = Contact(conexion,cursor)
	resultado = c.agregar(usuario,password,nameC,phoneC,mailC,faceC,twiC,instC)
	print(resultado)

	return jsonify(resultado)

app.run(debug=True)
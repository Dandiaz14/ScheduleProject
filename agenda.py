import mysql.connector
import hashlib
import getpass
#from invernadero import Invernadero


#usuario = input("Correo: ")
#contra = input("Password: ")
class Echauri:
	def __init__(self, conexion, cursor):
		self.conexion = conexion
		self.cursor = cursor

	def apivergas(self,usuario, password):
		contactos = []

		select = ("SELECT * FROM user WHERE mail = %s AND password = %s")
		self.cursor.execute(select,(usuario, password))

		resultado = self.cursor.fetchall()
		for row in resultado:
			code = row[0]
			break

		if resultado:
			self.cursor.execute("SELECT * FROM contact WHERE id_user = %s;", (code,))
			rows = self.cursor.fetchall()
			for c in rows:
				contacts = {
					'id': c[0],
					'name': c[1],
					'phone': c[2],
					'mail': c[3],
					'facebook': c[4],
					'twitter': c[5],
					'instagram': c[6],
					'id_user': c[7]
				}
				contactos.append(contacts)
			return contactos
		else:
			print ("Usuario/Contraseña Incorrectos")

class Usuario:
	def __init__(self, conexion, cursor):
		self.conexion = conexion
		self.cursor = cursor

	def crear(self, usuario, contra):
		insertar = ("INSERT INTO user(mail,password) VALUES(%s,%s)")
		self.cursor.execute(insertar,(usuario, password))
		self.conexion.commit()

	def login(self, usuario, contra):
		select = ("SELECT * FROM user WHERE mail = %s AND password = %s")
		self.cursor.execute(select,(usuario, contra))
		resultado = self.cursor.fetchall()

		if resultado:
			return True
		else:
			return False
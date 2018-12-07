class Contact:
	def __init__(self, conexion, cursor):
		self.conexion = conexion
		self.cursor = cursor

	def agregar(self,usuario,password, name, phone, mail, facebook,twitter,instagram):
		insertar = ("INSERT INTO contact(name, phone, mail, facebook, twitter, instagram, id_user) VALUES(%s,%s,%s,%s,%s,%s,%s)")
		id_user = self.getId(usuario)
		self.cursor.execute(insertar,(name, phone, mail, facebook, twitter, instagram, id_user))

		self.conexion.commit()
		return 'True'

	def buscar(self,id_user):
		contacts = []
		select = ('SELECT * FROM contact WHERE id_user = %s')
		self.cursor.execute(select,(id_user,))
		rows = self.cursor.fetchall()
		for c in rows:
			contact = {
				'id': c[0],
				'name': c[1],
				'phone': c[2],
				'mail': c[3],
				'facebook': c[4],
				'twitter': c[5],
				'instagram': c[6],
				'id_user': c[7]
			}
			contacts.append(contact)
		return contacts

	def getId(self,mail):
		select = ('SELECT * FROM user WHERE mail = %s')
		self.cursor.execute(select,(mail,))
		resultado = self.cursor.fetchall()
		for row in resultado:
			code = row[0]
			break
		return code
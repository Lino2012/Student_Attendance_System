import os
import re
from decouple import config
import MySQLdb

DATABASE_URL = config('DATABASE_URL', default='mysql://root:OBFEMIBqWBkYfOYLiYELvIYEKeDbkXgf@hayabusa.proxy.rlwy.net:57187/railway')
match = re.match(r'^mysql://(?P<user>[^:]+):(?P<password>[^@]+)@(?P<host>[^:]+):(?P<port>\d+)/(?P<name>.+)$', DATABASE_URL)
print('DATABASE_URL', DATABASE_URL)
print('MATCH', bool(match))
if match:
    db = match.groupdict()
    conn = MySQLdb.connect(host=db['host'], port=int(db['port']), user=db['user'], password=db['password'], database=db['name'], charset='utf8mb4')
    cur = conn.cursor()
    cur.execute("SELECT email, role, is_active, password_hash FROM users WHERE email=%s", ('adithayanrajan2005@gmail.com',))
    row = cur.fetchone()
    print('ROW', row)
    conn.close()

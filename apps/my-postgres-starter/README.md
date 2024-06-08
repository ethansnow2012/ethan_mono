## 有空再整理指令

brew install postgresql
brew services  
brew services stop postgresql@14
pg_ctl -D /usr/local/var/postgresql@14 status
pg_ctl -D /usr/local/var/postgresql@14 stop
pg_ctl -D /usr/local/var/postgresql@14 restart

psql -U $(whoami) -d postgres

```
CREATE DATABASE kaoethan;
\q
```

```
psql -U $(whoami) -d postgres
CREATE USER your_user WITH PASSWORD 'your_password';
CREATE DATABASE your_database_name OWNER your_user;
GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_user;
\q
```

Connection String:
postgresql://your_user:your_password@localhost:5432/your_database_name

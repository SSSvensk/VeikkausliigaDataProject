# VeikkausliigaDataProject
Veikkausliiga Data Project

1. Create a database in MySQL:

+------------+-------------+------+-----+---------+----------------+

| Field      | Type        | Null | Key | Default | Extra          |

+------------+-------------+------+-----+---------+----------------+

| id         | int(11)     | NO   | PRI | NULL    | auto_increment |

| weekday    | varchar(3)  | YES  |     | NULL    |                |

| date       | date        | YES  |     | NULL    |                |

| hometeam   | varchar(30) | YES  |     | NULL    |                |

| awayteam   | varchar(30) | YES  |     | NULL    |                |

| homegoals  | int(11)     | YES  |     | NULL    |                |

| awaygoals  | int(11)     | YES  |     | NULL    |                |

| attendance | int(11)     | YES  |     | NULL    |                |

+------------+-------------+------+-----+---------+----------------+

2. Then start the server with command node server.js

3. Then giving url localhost:3000/allmatches should hydrate the database.
4. Now you can go to frontend directory and run command npm run serve to start the frontend! :)

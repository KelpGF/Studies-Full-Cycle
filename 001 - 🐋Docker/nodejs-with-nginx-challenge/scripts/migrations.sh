#!/usr/bin/env bash

mysql -u"root" -p"$MYSQL_ROOT_PASSWORD" \
--execute="CREATE TABLE IF NOT EXISTS $MYSQL_DATABASE.people (name varchar(100));"
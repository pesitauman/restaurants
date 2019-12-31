package db

import (
	"sync"
	"sync/atomic"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

var initialized uint32
var mu sync.Mutex
var instance *sqlx.DB

var schema = `
	CREATE TABLE IF NOT EXISTS restaurant (
	id int AUTO_INCREMENT,
	name text,
	type text,
	phone text,
	location text,
	PRIMARY KEY (id),
	UNIQUE KEY (name(20))
);`

func Close() {
	instance.Close()
}

func GetDB() *sqlx.DB {
	if atomic.LoadUint32(&initialized) == 1 {
		return instance
	}
	mu.Lock()
	defer mu.Unlock()

	if initialized == 0 {
		instance, _ = sqlx.Connect("mysql", "root@tcp(127.0.0.1:3306)/restaurant")
		atomic.StoreUint32(&initialized, 1)
	}

	return instance
}

func Init() {
	GetDB().MustExec(schema)
}

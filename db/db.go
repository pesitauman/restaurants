package db

import (
	"os"
	"sync"
	"sync/atomic"

	"github.com/jmoiron/sqlx"
)

var initialized uint32
var mu sync.Mutex
var instance *sqlx.DB

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
		url, _ := os.LookupEnv("DATABASE_URL")

		instance, _ = sqlx.Connect("postgres", url)
		atomic.StoreUint32(&initialized, 1)
	}

	return instance
}

func Init() {
	GetDB().MustExec(schema)
}

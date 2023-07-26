package database

import (
	"database/sql"
	"github.com/google/uuid"
)

type Course struct {
	db *sql.DB
	ID string
	Name string
	Description string
	CategoryID string
}

func NewCourse(db *sql.DB) *Course {
	return &Course{db: db}
}

func (c *Course) Create(name string, description string, categoryID string) (*Course, error) {
	id := uuid.New().String()
	query := `INSERT INTO courses (id, name, description, category_id) VALUES ($1, $2, $3, $4)`
	_, err := c.db.Exec(query, id, name, description, categoryID)

	if err != nil {
		return nil, err
	}

	return &Course{db: c.db, ID: id, Name: name, Description: description, CategoryID: categoryID}, nil
}

func (c *Course) FindAll() ([]Course, error) {
	rows, err := c.db.Query("SELECT id, name, description, category_id FROM courses")

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	courses := []Course{}

	for rows.Next() {
		var id, name, description, categoryID string

		err := rows.Scan(&id, &name, &description, &categoryID)

		if err != nil {
			return nil, err
		}

		courses = append(courses, Course{ID: id, Name: name, Description: description, CategoryID: categoryID})
	}

	return courses, nil
}

// buscar courses por category_id
func (c *Course) FindByCategoryID(categoryID string) ([]Course, error) {
	rows, err := c.db.Query("SELECT id, name, description, category_id FROM courses WHERE category_id = $1", categoryID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	courses := []Course{}
	for rows.Next() {
		var id, name, description, categoryID string
		err := rows.Scan(&id, &name, &description, &categoryID)
		if err != nil {
			return nil, err
		}
		courses = append(courses, Course{ID: id, Name: name, Description: description, CategoryID: categoryID})
	}
	return courses, nil
}

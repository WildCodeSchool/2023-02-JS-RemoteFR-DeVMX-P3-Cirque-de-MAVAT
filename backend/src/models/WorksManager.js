const AbstractManager = require("./AbstractManager");

class WorksManager extends AbstractManager {
  constructor() {
    super({ table: "works" });
  }

  findAllWorks() {
    return this.database.query(
      `SELECT w.id, w.author_id, w.category_id, w.technique_id, w.image_id, w.reference, w.title, w.short_title, w.short_title, w.created, w.location, w.sizes, w.story, w.external, w.is_published, a.firstname, a.lastname, c.category, t.technique, i.src, i.description FROM ${this.table} AS w
      JOIN authors AS a ON w.author_id=a.id
      JOIN categories AS c ON w.category_id=c.id
      JOIN techniques AS t ON w.technique_id=t.id
      JOIN images AS i ON w.image_id=i.id
      ORDER BY w.id
      `
    );
  }

  create(
    authorId,
    categoryId,
    techniqueId,
    imageId,
    reference,
    title,
    shortTitle,
    created,
    location,
    sizes,
    story,
    externalLink,
    isPublished
  ) {
    return this.database.query(
      `INSERT INTO ${this.table}
      (author_id, category_id, technique_id, image_id, reference, title, short_title, created, location, sizes, story, external, is_published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        authorId,
        categoryId,
        techniqueId,
        imageId,
        reference,
        title,
        shortTitle,
        created,
        location,
        sizes,
        story,
        externalLink,
        isPublished,
      ]
    );
  }
}

module.exports = WorksManager;

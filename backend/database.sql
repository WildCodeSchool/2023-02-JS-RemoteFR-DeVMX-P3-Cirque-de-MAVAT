CREATE TABLE
    categories (
        id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        category VARCHAR(255) NOT NULL
    ) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE
    images (
        id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        src VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
    ) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE
    techniques (
        id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        technique VARCHAR(255) NOT NULL
    ) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE
    users (
        id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL UNIQUE KEY,
        password VARCHAR(255) NOT NULL,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        role INT(1) NOT NULL DEFAULT (0),
        created DATETIME NOT NULL DEFAULT NOW()
    ) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE
    authors (
        id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        image_id INT UNSIGNED,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        artistname VARCHAR(255),
        birthdate DATE NOT NULL,
        deathdate DATE,
        birthplace VARCHAR(255),
        deathplace VARCHAR(255),
        biography TEXT NOT NULL,
        CONSTRAINT fk_authors_images FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE
        SET
            NULL ON UPDATE NO ACTION
    ) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE
    works (
        id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
        author_id INT UNSIGNED NOT NULL,
        category_id INT UNSIGNED,
        technique_id INT UNSIGNED,
        image_id INT UNSIGNED NOT NULL,
        reference VARCHAR(255) NOT NULL UNIQUE KEY,
        title TEXT NOT NULL,
        short_title TEXT,
        created VARCHAR(255) NOT NULL DEFAULT '',
        location VARCHAR(255) NOT NULL,
        sizes VARCHAR(255),
        story TEXT,
        external VARCHAR(255),
        is_published INT(1) NOT NULL DEFAULT (0),
        CONSTRAINT fk_works_authors FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT fk_works_categories FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE
        SET
            NULL ON UPDATE NO ACTION,
            CONSTRAINT fk_works_techniques FOREIGN KEY (technique_id) REFERENCES techniques(id) ON DELETE
        SET
            NULL ON UPDATE NO ACTION,
            CONSTRAINT fk_works_images FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE ON UPDATE NO ACTION
    ) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

CREATE TABLE
    favourites (
        user_id INT UNSIGNED NOT NULL,
        work_id INT UNSIGNED NOT NULL,
        CONSTRAINT pk_favourites PRIMARY KEY (user_id, work_id),
        CONSTRAINT fk_favourites_users FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT fk_favourites_works FOREIGN KEY (work_id) REFERENCES works(id) ON DELETE CASCADE ON UPDATE NO ACTION
    ) ENGINE = InnoDB CHARACTER SET utf8 COLLATE utf8_unicode_ci;

-- Categories

INSERT INTO categories (category) VALUES ('Usines');

INSERT INTO categories (category) VALUES ('Travailleurs');

INSERT INTO categories (category) VALUES ('Lieux');

INSERT INTO categories (category) VALUES ('Animaux');

-- Techniques

INSERT INTO techniques (technique) VALUES ('Aquarelle');

INSERT INTO techniques (technique) VALUES ('Dessin');

INSERT INTO
    techniques (technique)
VALUES ('Dessin à la mine de plomb');

-- Users

INSERT INTO
    users (
        email,
        password,
        firstname,
        lastname,
        role
    )
VALUES (
        'benoit.vandanjon@wildcodeschool.com',
        '123456',
        'Benoît',
        'Vandanjon',
        1
    );

INSERT INTO
    users (
        email,
        password,
        firstname,
        lastname,
        role
    )
VALUES (
        'anthony.gorski@wildcodeschool.com',
        '123456',
        'Anthony',
        'Gorski',
        1
    );

INSERT INTO
    users (
        email,
        password,
        firstname,
        lastname,
        role
    )
VALUES (
        'victor.brito@wildcodeschool.com',
        '123456',
        'Victor',
        'Brito',
        0
    );

INSERT INTO
    users (
        email,
        password,
        firstname,
        lastname,
        role
    )
VALUES (
        'marine.deveza@wildcodeschool.com',
        '123456',
        'Marine',
        'Deveza',
        0
    );

INSERT INTO
    users (
        email,
        password,
        firstname,
        lastname,
        role
    )
VALUES (
        'anthony.lasternas@wildcodeschool.com',
        '123456',
        'Anthony',
        'Lasternas',
        0
    );

INSERT INTO
    users (
        email,
        password,
        firstname,
        lastname,
        role
    )
VALUES (
        'anne.louis@wildcodeschool.com',
        '123456',
        'Anne',
        'Louis',
        0
    );

INSERT INTO
    users (
        email,
        password,
        firstname,
        lastname,
        role
    )
VALUES (
        'trung.nguyen@wildcodeschool.com',
        '123456',
        'Trung',
        'Nguyen',
        0
    );

-- Images

INSERT INTO
    images (src, description)
VALUES (
        'image-001.jpg',
        'Short description of the image for screen reader users'
    );

INSERT INTO
    images (src, description)
VALUES (
        'image-002.jpg',
        'Short description of the image for screen reader users'
    );

-- Authors

INSERT INTO
    authors (
        image_id,
        firstname,
        lastname,
        birthdate,
        deathdate,
        biography
    )
VALUES (
        2,
        'Hippolyte Charles Napoléon',
        'Mortier Duc de Trévise',
        '1835-05-04',
        '1892-02-13',
        'C’est cette année que j’ai eu la révélation.'
    );

-- Works

INSERT INTO
    works (
        author_id,
        category_id,
        technique_id,
        image_id,
        reference,
        title,
        short_title,
        created,
        location,
        sizes,
        story,
        external,
        is_published
    )
VALUES (
        1,
        1,
        1,
        1,
        '40FI79',
        'Effet de nuit sur la Cheminée usine du Tampon',
        'Cheminée du Tampon',
        '1866',
        'IHOI',
        '20 × 14',
        'Attribuée parfois à l’usine du Grand Tampon, mais c’est peu probable: l’usine du Grand Tampon ayant été une scierie. Or, ici, il s’agit sans doute de l’usine de Bel Air: on reconnaît les deux corps principaux du bâtiment industriel (purgerie et bâtiment abritant la machine à vapeur) en parallèle, comme sur les figures 2 et 3. La cheminée carrée est sur le côté Nord, construite en basalte, avec intercalation de poutres deux côtés par deux côtés. Devant, un gardien, dont l’ombre se projette sur la cheminée. En arrière-plan, une allée de palmiers, qui semble mener vers la maison de maître. La disposition des lieux correspond à celle qui existait à Bel Air. Scène d’apparence paisible ?',
        '',
        1
    );

INSERT INTO
    works (
        author_id,
        category_id,
        technique_id,
        image_id,
        reference,
        title,
        short_title,
        created,
        location,
        sizes,
        story,
        external,
        is_published
    )
VALUES (
        1,
        1,
        3,
        1,
        '40FI80',
        'Tampon- Une usine',
        'Usine du Tampon',
        '1866',
        'IHOI',
        '11.5 × 20.5',
        'Une autre vue de l’usine de Bel Air, au Tampon: on retrouve le bâtiment en quinconce accolé au corps de l’usine, avec ses deux cheminées. Au premier plan, sur le chemin de l’Etablissement (400 m. d’altitude), on distingue un groupe de travailleurs engagés, près d’un point d’eau: un homme, une femme avec un bébé qui porte une jarre sur la tête, et un autre personnage. L’auteur note le nom des arbres et plantes (aloés divers, vacoas, palmiers)',
        'https://view.genial.ly/5fb636d03636f40d7f883f24',
        0
    );
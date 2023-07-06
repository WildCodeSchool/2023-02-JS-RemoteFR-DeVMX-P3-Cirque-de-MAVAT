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
        CONSTRAINT fk_authors_images FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE SET NULL ON UPDATE NO ACTION
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
        CONSTRAINT fk_works_categories FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL ON UPDATE NO ACTION,
        CONSTRAINT fk_works_techniques FOREIGN KEY (technique_id) REFERENCES techniques(id) ON DELETE SET NULL ON UPDATE NO ACTION,
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

INSERT INTO categories (category) VALUES
    ('Usines'),
    ('Travailleurs'),
    ('Lieux'),
    ('Animaux');

-- Techniques

INSERT INTO techniques (technique) VALUES
    ('Aquarelle'),
    ('Dessin'),
    ('Dessin à la mine de plomb');

-- Users

INSERT INTO users (email, password, firstname, lastname, role) VALUES
    (
        'benoit.vandanjon@wildcodeschool.com',
        '$argon2id$v=19$m=16384,t=2,p=1$k3aFXCpcjyZ2cHpcZPDw3w$gSJbTCadxNikkm/zhTb+IvPDDJyZe0LpZh+5bCE7X+g',
        'Benoît',
        'Vandanjon',
        1
    ),
    (
        'anthony.gorski@wildcodeschool.com',
        '$argon2id$v=19$m=16384,t=2,p=1$k3aFXCpcjyZ2cHpcZPDw3w$gSJbTCadxNikkm/zhTb+IvPDDJyZe0LpZh+5bCE7X+g',
        'Anthony',
        'Gorski',
        1
    ),
    (
        'victor.brito@wildcodeschool.com',
        '$argon2id$v=19$m=16384,t=2,p=1$k3aFXCpcjyZ2cHpcZPDw3w$gSJbTCadxNikkm/zhTb+IvPDDJyZe0LpZh+5bCE7X+g',
        'Victor',
        'Brito',
        0
    ),
    (
        'marine.deveza@wildcodeschool.com',
        '$argon2id$v=19$m=16384,t=2,p=1$k3aFXCpcjyZ2cHpcZPDw3w$gSJbTCadxNikkm/zhTb+IvPDDJyZe0LpZh+5bCE7X+g',
        'Marine',
        'Deveza',
        0
    ),
    (
        'anthony.lasternas@wildcodeschool.com',
        '$argon2id$v=19$m=16384,t=2,p=1$k3aFXCpcjyZ2cHpcZPDw3w$gSJbTCadxNikkm/zhTb+IvPDDJyZe0LpZh+5bCE7X+g',
        'Anthony',
        'Lasternas',
        0
    ),
    (
        'anne.louis@wildcodeschool.com',
        '$argon2id$v=19$m=16384,t=2,p=1$k3aFXCpcjyZ2cHpcZPDw3w$gSJbTCadxNikkm/zhTb+IvPDDJyZe0LpZh+5bCE7X+g',
        'Anne',
        'Louis',
        0
    ),
    (
        'trung.nguyen@wildcodeschool.com',
        '$argon2id$v=19$m=16384,t=2,p=1$k3aFXCpcjyZ2cHpcZPDw3w$gSJbTCadxNikkm/zhTb+IvPDDJyZe0LpZh+5bCE7X+g',
        'Trung',
        'Nguyen',
        0
    );

-- Images

INSERT INTO images (src, description) VALUES
    (
        '40FI79.jpg',
        'Cheminée du Tampon'
    ),
    (
        '40FI78.jpg',
        'L’Établissement'
    ),
    (
        '40FI80.jpg',
        'Usine du Tampon'
    ),
    (
        '40FI106.jpg',
        'Établissement de la Rivière'
    ),
    (
        '40FI.jpg',
        'Boutchiana- Indien'
    ),
    (
        '40FI91.jpg',
        'Boutchiana- Casernes'
    ),
    (
        '40FI90.jpg',
        'Boutchiana-Casernes, de face'
    ),
    (
        '40FI76.jpg',
        'Cafrine et son petit au Tampon'
    ),
    (
        '40FI52.jpg',
        'La vieille (Victorine) Mme Samsi Casernes'
    ),
    (
        '40FI66.jpg',
        'Elise'
    ),
    (
        '40Fi75.jpg',
        'Lucie le ventre plein de cari'
    ),
    (
        '40Fi74.jpg',
        'La belle Tina'
    ),
    (
        '40Fi60.jpg',
        'Jamali, Cafre, Gardien'
    ),
    (
        '40FI55.jpg',
        'Le parapluie du pauvre Citoyen'
    ),
    (
        '40FI53_2.jpg',
        'La pli y fait pas rien, ça ! Tampon'
    ),
    (
        '40FI59.jpg',
        'Monsieur Bourrayne dans le jardin des Casernes'
    ),
    (
        '40Fi72.jpg',
        'Golo et Chanvert'
    ),
    (
        '40Fi83.jpg',
        'Sortie du Bras de Jean Payet'
    ),
    (
        '40Fi77.jpg',
        'Bassin rouge'
    ),
    (
        '40Fi104.jpg',
        'Caverne des lataniers'
    ),
    (
        '40Fi105bis.jpg',
        'Pas de Bellecombe'
    ),
    (
        '40Fi108.jpg',
        'Mamzelle'
    ),
    (
        '40FI73.jpg',
        'Charrette tirée par des mulets'
    ),
    (
        '40FI53.1.jpg',
        'Caille de Bourbon'
    );

-- Authors

INSERT INTO authors (image_id, firstname, lastname, birthdate, deathdate, biography) VALUES
    (
        2,
        'Hippolyte Charles Napoléon',
        'Mortier Duc de Trévise',
        '1835-05-04',
        '1892-02-13',
        'C’est cette année que j’ai eu la révélation.'
    );

-- Works

INSERT INTO works (author_id, category_id, technique_id, image_id, reference, title, short_title, created, location, sizes, story, external, is_published) VALUES
    (
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
        'Attribuée parfois à l’usine du Grand Tampon, mais c’est peu probable : l’usine du Grand Tampon ayant été une scierie. Or, ici, il s’agit sans doute de l’usine de Bel Air : on reconnaît les deux corps principaux du bâtiment industriel (purgerie et bâtiment abritant la machine à vapeur) en parallèle, comme sur les figures 2 et 3. La cheminée carrée est sur le côté Nord, construite en basalte, avec intercalation de poutres deux côtés par deux côtés. Devant, un gardien, dont l’ombre se projette sur la cheminée. En arrière-plan, une allée de palmiers, qui semble mener vers la maison de maître. La disposition des lieux correspond à celle qui existait à Bel Air. Scène d’apparence paisible ?',
        NULL,
        1
    ),
    (
        1,
        1,
        1,
        2,
        '40FI78',
        'Arrivée à l’établissement du Tampon',
        'L’Établissement',
        '1866',
        'IHOI',
        '15 × 13.5',
        'Le chemin de l’Établissement existe toujours aujourd’hui, à 400 mètres d’altitude. Les deux cavaliers sont sans doute Ch. H. N; Mortier de Trévise lui-même, et son beau-frère (Denis-André de K/véguen)? En avant, 3 autres personnages cheminent à pied. La route traverse le lit desseché de la Rivière d’Abord, et remonte légèrement vers l’Établissement (c’est-à-dire l’ensemble du fonds avec usine, bâtiments annexes, et camp des travailleurs engagés, non représenté ici. L’usine elle-même est composée de deux corps parallèles de bâtiments, flanqués chacun d’une cheminée : l’une pour évacuer les fumées de combustion pour la batterie Gimart, l’autre la fumée de la machine à vapeur. En quinconce, un autre bâtiment à l’avant, abritant les "tables" pour le séchage du sucre?',
        NULL,
        1
    ),
    (
        1,
        1,
        3,
        3,
        '40FI80',
        'Tampon- Une usine',
        'Usine du Tampon',
        '1866',
        'IHOI',
        '11.5 × 20.5',
        'Une autre vue de l’usine de Bel Air, au Tampon : on retrouve le bâtiment en quinconce accolé au corps de l’usine, avec ses deux cheminées. Au premier plan, sur le chemin de l’Établissement (400 m. d’altitude), on distingue un groupe de travailleurs engagés, près d’un point d’eau : un homme, une femme avec un bébé qui porte une jarre sur la tête, et un autre personnage. L’auteur note le nom des arbres et plantes (aloés divers, vacoas, palmiers)',
        'https://view.genial.ly/5fb636d03636f40d7f883f24',
        1
    ),
    (
        1,
        1,
        1,
        4,
        '40FI106',
        'Quartier St Pierre. Établissement de la Rivière, montagnes de l’Entre Deux',
        'Établissement de la Rivière',
        '1861 ou 1866',
        'IHOI',
        '19.5 × 16.5',
        'L’usine (Établissement) est installée rive gauche de la Rivière Saint-Etienne, au débouché du lieu-dit l’Entre-Deux. Elle semble présenter la même physionomie que les autres établissements achetés ou construits par Gabriel de K/Véguen : 2 corps principaux de bâtiments, ici décalés l’un par rapport à l’autre, avec des ouvertures en arc de cercle pou évacuer la chaleur, la cheminée qui évacue les fumées de la batterie Gimart, et, à l’arrière, un ou deux bâtiments pour le séchage du sucre. Au Premier plan, une escouade (une "bande") de travailleurs engagés effectue la "trouaison", pour la replantation de cannes à sucre, sous la direction d’un Commandeur, vêtu d’un pantalon de toile bleue. Un vacoa est ici le témoin indispensable de l’usage de ses feuilles pour le tressage de sacs, destinés ensuite à transporter le sucre produit. ',
        NULL,
        1
    ),
    (
        1,
        2,
        1,
        5,
        '40FI',
        'Boutchiana- Indien',
        'Boutchiana- Indien',
        'juillet 1871',
        'IHOI',
        NULL,
        'Boutchiana est devenu le domestique personnel de Ch.Mortier de Trévise, et il a vieilli de 6 ans.',
        NULL,
        1
    ),
    (
        1,
        2,
        1,
        6,
        '40FI91',
        'Boutchiana- Casernes',
        'Boutchiana- Casernes',
        '24 août 1865',
        'IHOI',
        '19.5 × 11',
        'Travailleur engagé depuis l’Inde à l’Établissement des Casernes, il tient une lance, peut-être a-t-il une fonction de gardien? Sur sa fiche d’engagement, il était recensé comme tailleur ',
        NULL,
        1
    ),
    (
        1,
        2,
        1,
        7,
        '40FI90',
        'Boutchiana-Casernes, de face',
        'Boutchiana-Casernes, de face',
        '1865',
        'IHOI',
        '19.5 × 8.5',
        'Complète la précédente aquarelle. On devine la jeunesse de Boutchiana, engagé à l’adolescence. Arrivé à bord de Yanaon, en Inde, à bord du navire de la famille Kerveguen, Le Canova, on le dit âgé de 17 ans',
        NULL,
        1
    ),
    (
        1,
        2,
        1,
        8,
        '40FI76',
        'Cafrine et son petit au Tampon',
        'Cafrine et son petit au Tampon',
        '1861',
        'IHOI',
        '18 × 13',
        'C’est une engagée, ou alors une affranchie. Elle porte la robe de toile bleue, dont la fourniture est obligatoire par l’employeur, selon les termes du contrat d’engagement. La pratique ne change guère de ce qui était déjà prévu avant 1848 pour les esclaves, par le « Code noir » de 1723.',
        NULL,
        1
    ),
    (
        1,
        2,
        1,
        9,
        '40FI52',
        'La vieille (Victorine) Mme Samsi Casernes',
        'La vieille (Victorine) Mme Samsi Casernes',
        '15 décembre 1865',
        'IHOI',
        '18 × 12',
        'La vieille dame est assise sur une natte, vêtue de la traditionnelle robe de toile bleue fournie par l’employeur. Son foulard noué sur la tête est taillé dans la même toile. ',
        'https://belair.hypotheses.org/389',
        1
    ),
    (
        1,
        2,
        2,
        10,
        '40FI66',
        'Elise',
        'Elise',
        'août 1861',
        'IHOI',
        NULL,
        'Elise est une petite fille de Victorine, issue de sa fille Coralie',
        NULL,
        1
    ),
    (
        1,
        2,
        2,
        11,
        '40Fi75',
        'Lucie le ventre plein de cari',
        'Lucie le ventre plein de cari',
        '1866',
        'IHOI',
        NULL,
        'Une autre petite fille de Victorine, sans doute dans la maison des Casernes.',
        NULL,
        1
    ),
    (
        1,
        2,
        2,
        12,
        '40Fi74',
        'La belle Tina',
        'La belle Tina',
        '1866',
        'IHOI',
        NULL,
        'Visiblement, Mortier de Trévise a été impressionné par la chevelure de Tina. Encore une petite fille de Victorine, plus jeune. il semble que les fillettes fassent leur apprentissage de domestiques dans la propriété des Kerveguen.',
        NULL,
        1
    ),
    (
        1,
        2,
        1,
        13,
        '40Fi60',
        'Jamali, Cafre, Gardien',
        'Jamali, Cafre, Gardien',
        '1861',
        'IHOI',
        '26 × 16.5',
        '"Cafre" veut dire que Jamali n’est pas né sur l’Habitation, mais qu’il a vraisemblablement été recruté comme engagé. Il est armé d’une lance, et surveille l’orée des champs, ou les abords du camp des travailleurs.',
        'https://forgetmenot.objettemoin.org/index.php/fr/actus/36-jamali-gardien-de-cannes',
        1
    ),
    (
        1,
        2,
        1,
        14,
        '40FI55',
        'Le parapluie du pauvre Citoyen',
        'Le parapluie du pauvre Citoyen',
        '1861',
        'IHOI',
        '19 × 11.5',
        'Le titre de citoyen est une fierté pour les affranchis de 1848 qui travaillent sur la propriété ou dans les Établissements K/Véguen. La pluie est rare à Saint-Pierre, beaucoup plus fréquente au Tampon (pluies orographiques pendant la saison chaude, celle de la coupe des cannes). Ici, le créole engagé dispose d’une maigre rémunération, juste suffisante pour sa nourriture et de menus frais à la "boutique". Depuis 1859, le salaire est en outre versé en kreutzers ( démonétisés, au cours forcé de 1 franc. A l’arrière-plan, sur la droite, la silhouette d’une cheminée d’usine, peut-être celle de Bel-Air, au Tampon.',
        NULL,
        1
    ),
    (
        1,
        2,
        2,
        15,
        '40FI53.2',
        'La pli y fait pas rien, ça ! Tampon',
        'La pli y fait pas rien, ça ! Tampon',
        '27 janvier 1866',
        'IHOI',
        '30 × 20',
        'La suite du commentaire est : « Ca ne lui fait rien,… tant pis pour lui ! mais aux cannes ça leur fait du bien tant mieux pour elles !…. » Le jeune créole porte un chapeau de feutre déformé, pas de chaussures, comme la majorité des travailleurs. Janvier est en pleine période cyclonique : est-ce le cas ici ?',
        NULL,
        1
    ),
    (
        1,
        2,
        2,
        16,
        '40FI59',
        'Monsieur Bourrayne dans le jardin des Casernes',
        'Monsieur Bourrayne dans le jardin des Casernes',
        '1861',
        'IHOI',
        '20 × 12.5',
        'la suite du commentaire est : « Allons, Virasami, vivement mettre la racine de ce plant (?) comme à Madras ! » ',
        NULL,
        1
    ),
    (
        1,
        2,
        2,
        17,
        '40Fi72',
        'Chanvert descend le chemin de la Plaine, Golo est à ses côtés',
        'Golo et Chanvert',
        '1861',
        'IHOI',
        '8 × 15.5',
        'Chanvert est peut-etre un ami de la famille. Golo est un domestique qui l’accompagne. À l’arrière du tilbury, il semble qu’il y ait une borne kilométrique sur le côté de la route. Le chemin de la Plaine relie Saint-Pierre à la Plaine des Cafres, et, au-delà, à Saint-Benoît. L’Établissement de Bel-Air est situé au tiers du parcours, entre La Plaine des Cafres et Saint-Pierre. ',
        'https://belair.hypotheses.org/1351',
        1
    ),
    (
        1,
        3,
        2,
        18,
        '40Fi83',
        'Sortie du Bras de Jean Payet en allant vers le Tampon',
        'Sortie du Bras de Jean Payet',
        '29 janvier 1865',
        'IHOI',
        '30 × 22.5',
        'Le tilbury à quatre roues est tiré par quatre mules (importées du Poitou). La route, encore reconnaissable aujourd’hui, reliait les chmps de canne situés entre la ravin e Jean Payet (ancienne ravine du Tampon), et la ravine des Cafres. au sommet de ces champs, une scierie fournissait le bois et les planches pour les Établissements K/Véguen',
        NULL,
        1
    ),
    (
        1,
        3,
        1,
        19,
        '40Fi77',
        'Le bassin rouge au Tampon, la ravine descend',
        'Bassin rouge',
        '10 février 1866',
        'IHOI',
        '15 × 9.5',
        'La cascade alimente un bassin à proximité d’un affluent de la rivière d’Abord',
        NULL,
        1
    ),
    (
        1,
        3,
        2,
        20,
        '40Fi104',
        'Excursion au volcan de Bourbon',
        'Caverne des lataniers',
        'août 1861',
        'IHOI',
        '24.5 × 32',
        'Mortier de Trévise et sa belle-famille sont ne excursion au volcan. Il n’y avait pas de route, alors : il faut donc dormir en chemin dans cette caverne autrefois connue des noirs marrons, autrement dit fugitifs -avant  l’abolition de l’escalvage de 1848',
        'https://view.genial.ly/6432b64851cad10018f64868/interactive-caverne-lataniers',
        1
    ),
    (
        1,
        3,
        1,
        21,
        '40Fi105bis',
        'Le volcan de Bourbon vu du Pas de Bellecombre',
        'Pas de Bellecombe',
        '1861',
        'IHOI',
        '18 × 24',
        'Cela ne fait guère longtemps que le passage par le Pas de Bellecombe a été trouvé. Le lieu porte le nom du gouverneur présent au moment de la découverte du passage, mais c’est un esclave, Jacob, qui l’a découvert, en réalité. Bellecombe avait commandité l’expédition.',
        NULL,
        1
    ),
    (
        1,
        4,
        2,
        22,
        '40Fi108',
        'Mamzelle',
        'Mamzelle',
        '14 avril 1866',
        'IHOI',
        '14.5 × 19.5',
        'Les chevaux sont rares sur les établissements : ils font l’objet de soins attentifs, et ne sont montés que par les propriétaires des Établissements, et les contremaîtres. Selle et cuirs peuvent être fabriqués sur place : il y eut un atelier sur l’Établissement du Tampon.',
        NULL,
        1
    ),
    (
        1,
        4,
        2,
        23,
        '40FI73',
        'Charrette tirée par des mulets',
        'Charrette tirée par des mulets',
        '1861',
        'IHOI',
        '6.5 × 15.5',
        '4 mulets tirent une charrette apportant des cannes frâichement coupées à l’usine. Les mulets sont nombreux dans l’île à l’époque de l’industrialisation sucrière. Importés du Poitou, ce sont des bêtes robustes, qui coûtent moins chers que des boeufs ou des chevaux, pour lesquelles on construit des écuries. Elles ont des noms : on sait que dans l’Établissement des Casernes, Tec Tec, Langoutil, et Malheur sont des noms de mules.',
        NULL,
        1
    ),
    (
        1,
        4,
        1,
        24,
        '40FI53.1',
        'Caille de Bourbon',
        'Caille de Bourbon',
        '21 septembre 1861',
        'IHOI',
        '19 × 23',
        'En réalité, la caille fut introduite d’Asie, Inde ou chine, vers 1850. C’est la femelle qui est colorée ainsi de rouge au bas des ailes. A l’époque de Mortier de Trévise, c’est donc une curiosité, un peu en disparition, à cause de l’extension des champs cultivés en cannes à sucre.',
        'https://www.seor.fr/oiseau-25-caille-peinte.html',
        1
    );

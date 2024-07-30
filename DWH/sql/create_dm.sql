DROP TABLE IF EXISTS dm.category_know CASCADE;
CREATE TABLE dm.category_know (
	id SERIAL PRIMARY KEY,
	название VARCHAR (50),
	активность BOOLEAN,
	"Дата изм." DATE
);

DROP TABLE IF EXISTS dm.period CASCADE;
CREATE TABLE dm.period (
	id SERIAL PRIMARY KEY,
	название VARCHAR (50),
	активность BOOLEAN,
	"Дата изм." DATE,
	"начало_периода" DATE,
	"конец_периода" DATE
);

DROP TABLE IF EXISTS dm.сотрудники_дар CASCADE;
CREATE TABLE dm.сотрудники_дар (
	id SERIAL PRIMARY KEY,
	"Дата рождения" DATE,
	активность BOOLEAN,
	пол VARCHAR (5),
	фамилия VARCHAR (150),
	имя VARCHAR (150),
	"Последняя авторизация" DATE,
	должность VARCHAR (150),
	цфо VARCHAR (50),
	"Дата регистрации" DATE,
	"Дата изменения" DATE,
	подразделения VARCHAR (150),
	"E-Mail" VARCHAR (150),
	логин VARCHAR (150),
	компания VARCHAR (150),
	"Город проживания" VARCHAR (150)
);

DROP TABLE IF EXISTS dm.knows CASCADE;
CREATE TABLE dm.knows (
	id SERIAL PRIMARY KEY,
	название VARCHAR (250),
	активность BOOLEAN,
	"Дата изм." DATE
);

DROP TABLE IF EXISTS dm.levels CASCADE;
CREATE TABLE dm.levels (
	id SERIAL PRIMARY KEY,
	название VARCHAR (250),
	n_level INT,
	активность BOOLEAN,
	"Дата изм." DATE
);

DROP TABLE IF EXISTS dm.summary_tab CASCADE;
CREATE TABLE dm.summary_tab (
	id SERIAL PRIMARY KEY,
	record_id INT,
	"User ID" INT,
	date_first DATE,
	date_last DATE,
	category_know_id INT,
	know_id INT,
	level_id INT,
	n_level INT,
	current_level BOOLEAN,
	period_id INT,
	growth INT,
	FOREIGN KEY ("User ID") REFERENCES dm.сотрудники_дар (id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (category_know_id) REFERENCES dm.category_know (id) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (know_id) REFERENCES dm.knows (id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (level_id) REFERENCES dm.levels (id) ON UPDATE CASCADE ON DELETE SET NULL,
	FOREIGN KEY (period_id) REFERENCES dm.period ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS temporary_tables.навыки_и_уровни_знаний;
CREATE TABLE temporary_tables.навыки_и_уровни_знаний (
	record_id SERIAL PRIMARY KEY,
	"User ID" INT,
	date_last DATE,
	know_id INT,
	date_first DATE,
	level_id INT,
	n_level INT,
	category_know_id INT
);

DROP TABLE IF EXISTS temporary_tables.for_summary_tab;
CREATE TABLE temporary_tables.for_summary_tab (
	id SERIAL PRIMARY KEY,
	record_id INT,
	"User ID" INT,
	date_last DATE,
	date_first DATE,
	category_know_id INT,
	know_id INT,
	level_id INT,
	n_level INT,
	period_id INT
)

CREATE TABLE dds.базы_данных (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.базы_данных_и_уровень_знаний_сотрудников (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    база_данных_id INT,
    уровень_знаний_id INT,
    FOREIGN KEY (база_данных_id) REFERENCES dds.базы_данных(id),
    FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.инструменты (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.инструменты_и_уровень_знаний_сотрудников (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    дата DATE,
    инструменты_id INT,
    уровень_знаний_id INT,
    FOREIGN KEY (инструменты_id) REFERENCES dds.инструменты(id),
    FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id)

);

CREATE TABLE dds.образование_пользователей (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    уровень_образования VARCHAR(255),
    название_учебного_заведения VARCHAR(255),
    фиктивное_название VARCHAR(255),
    факультет_кафедра VARCHAR(255),
    специальность VARCHAR(255),
    квалификация VARCHAR(255),
    год_окончания INT,
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id)
);

CREATE TABLE dds.отрасли (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.опыт_сотрудника_в_отраслях (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата TIMESTAMP,
    отрасли_id INT,
    уровень_знаний_в_отрасли_id INT,
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (отрасли_id) REFERENCES dds.отрасли(id),
    FOREIGN KEY (уровень_знаний_в_отрасли_id) REFERENCES dds.уровни_знаний_в_отрасли(id)
);

CREATE TABLE dds.опыт_сотрудника_в_предметных_областях (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата TIMESTAMP,
    предметная_область_id INT,
    уровень_знаний_в_предметной_области_id INT,
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (предметная_область_id) REFERENCES dds.предметная_область(id),
    FOREIGN KEY (уровень_знаний_в_предметной_области_id) REFERENCES dds.уровни_знаний_в_предметной_области(id)
);

CREATE TABLE dds.платформы (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.предметная_область (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.резюмедар (
    resume_id SERIAL PRIMARY KEY,
    user_id INT,
    активность BOOLEAN,
    образование INT,
    сертификаты_курсы INT,
    языки INT,
    базы_данных INT,
    инструменты INT,
    отрасли INT,
    платформы INT,
    предметные_области INT,
    среда_разработки INT,
    типы_систем INT,
    фреймворки INT,
    языки_программирования INT,
    технологии INT,
    FOREIGN KEY (user_id) REFERENCES dds.пользователи(id),
    FOREIGN KEY (образование) REFERENCES dds.образование_пользователей(id),
    FOREIGN KEY (сертификаты_курсы) REFERENCES dds.сертификаты_курсы(id),
    FOREIGN KEY (языки) REFERENCES dds.языки(id),
    FOREIGN KEY (базы_данных) REFERENCES dds.базы_данных(id),
    FOREIGN KEY (инструменты) REFERENCES dds.инструменты(id),
    FOREIGN KEY (отрасли) REFERENCES dds.отрасли(id),
    FOREIGN KEY (платформы) REFERENCES dds.платформы(id),
    FOREIGN KEY (предметные_области) REFERENCES dds.предметные_области(id),
    FOREIGN KEY (среда_разработки) REFERENCES dds.среды_разработки_разработки(id),
    FOREIGN KEY (типы_систем) REFERENCES dds.типы_систем(id),
    FOREIGN KEY (фреймворки) REFERENCES dds.фреймворки(id),
    FOREIGN KEY (языки_программирования) REFERENCES dds.языки_программирования(id),
    FOREIGN KEY (технологии) REFERENCES dds.технологии(id)
);

CREATE TABLE dds.сертификаты_пользователей (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    год_сертификата INT,
    наименование_сертификата VARCHAR(255),
    организация_выдавшая_сертификат VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id)
);

CREATE TABLE dds.сотрудники_дар (
    id SERIAL PRIMARY KEY,
    дата_рождения DATE,
    активность BOOLEAN,
    пол VARCHAR(10),
    фамилия VARCHAR(255),
    имя VARCHAR(255),
    последняя_авторизация TIMESTAMP,
    должность VARCHAR(255),
    цфо VARCHAR(255),
    дата_регистрации DATE,
    дата_изменения TIMESTAMP,
    подразделения VARCHAR(255),
    email VARCHAR(255),
    логин VARCHAR(255),
    компания VARCHAR(255),
    город_проживания VARCHAR(255)
);

CREATE TABLE dds.среды_разработки (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    инструмент_id INT REFERENCES dds.инструменты(id)
);

CREATE TABLE dds.среды_разработки_и_уровень_знаний_сотрудников (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    дата DATE,
    среды_разработки_id INT,
    уровень_знаний_id INT,
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники(id),
    FOREIGN KEY (среды_разработки_id) REFERENCES dds.среды_разработки(id),
    FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.типы_программирования (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.типы_систем (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.типы_систем_и_уровень_знаний_сотрудников (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    типы_систем_id INT,
    уровень_знаний_id INT,
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники(id),
    FOREIGN KEY (типы_систем_id) REFERENCES dds.типы_систем(id),
    FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.технологии (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.технологии_и_уровень_знаний_сотрудников (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    технологии_id INT,
    уровень_знаний_id INT,
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (технологии_id) REFERENCES dds.технологии(id),
    FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.уровни_владения_ин(
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.уровни_знаний (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.уровни_знаний_в_отрасли (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.уровни_знаний_в_предметной_области (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.уровень_образования (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата TIMESTAMP
);

CREATE TABLE dds.фреймворки (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.фреймворки_и_уровень_знаний_сотрудников (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    фреймворки_id INT,
    уровень_знаний_id INT,
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (фреймворки_id) REFERENCES dds.фреймворки(id),
    FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id)
);

CREATE TABLE dds.языки (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.языки_пользователей (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    язык_id INT,
    уровень_знаний_иностранного_языка_id INT,
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (язык_id) REFERENCES dds.языки(id),
    FOREIGN KEY (уровень_знаний_иностранного_языка_id) REFERENCES dds.уровни_владения_ин(id)
);

CREATE TABLE dds.языки_программирования (
    id SERIAL PRIMARY KEY,
    название VARCHAR(255) NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP
);

CREATE TABLE dds.языки_программирования_и_уровень_знаний (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    активность BOOLEAN,
    сорт INT,
    дата_изм TIMESTAMP,
    дата DATE,
    уровень_знаний_id INT,
    язык_программирования_id INT,
    FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id),
    FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id),
    FOREIGN KEY (язык_программирования_id) REFERENCES dds.языки_программирования(id)
);

-- Скрипт для создания отношений между таблицами

ALTER TABLE dds.базы_данных_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_база_данных
FOREIGN KEY (база_данных_id) REFERENCES dds.базы_данных(id);

ALTER TABLE dds.базы_данных_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_бд
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.инструменты_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_инструменты
FOREIGN KEY (инструменты_id) REFERENCES dds.инструменты(id);

ALTER TABLE dds.инструменты_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_инструменты
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.образование_пользователей
ADD CONSTRAINT fk_образование_пользователи
FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id);

ALTER TABLE dds.опыт_сотрудника_в_отраслях
ADD CONSTRAINT fk_отрасли
FOREIGN KEY (отрасли_id) REFERENCES dds.отрасли(id);

ALTER TABLE dds.опыт_сотрудника_в_отраслях
ADD CONSTRAINT fk_уровень_знаний_в_отрасли
FOREIGN KEY (уровень_знаний_в_отрасли_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.опыт_сотрудника_в_предметных_областях
ADD CONSTRAINT fk_предметная_область
FOREIGN KEY (предметная_область_id) REFERENCES dds.предметная_область(id);

ALTER TABLE dds.опыт_сотрудника_в_предметных_областях
ADD CONSTRAINT fk_уровень_знаний_в_предметной_области
FOREIGN KEY (уровень_знаний_в_предметной_области_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_образование
FOREIGN KEY (образование) REFERENCES dds.образование_пользователей(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_сертификаты_курсы
FOREIGN KEY (сертификаты_курсы) REFERENCES dds.сертификаты_пользователей(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_языки
FOREIGN KEY (языки) REFERENCES dds.языки(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_базы_данных
FOREIGN KEY (базы_данных) REFERENCES dds.базы_данных(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_инструменты
FOREIGN KEY (инструменты) REFERENCES dds.инструменты(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_отрасли
FOREIGN KEY (отрасли) REFERENCES dds.отрасли(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_платформы
FOREIGN KEY (платформы) REFERENCES dds.платформы(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_предметные_области
FOREIGN KEY (предметные_области) REFERENCES dds.предметная_область(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_среда_разработки
FOREIGN KEY (среда_разработки) REFERENCES dds.среды_разработки(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_типы_систем
FOREIGN KEY (типы_систем) REFERENCES dds.типы_систем(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_фреймворки
FOREIGN KEY (фреймворки) REFERENCES dds.фреймворки(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_языки_программирования
FOREIGN KEY (языки_программирования) REFERENCES dds.языки_программирования(id);

ALTER TABLE dds.резюмедар
ADD CONSTRAINT fk_технологии
FOREIGN KEY (технологии) REFERENCES dds.технологии(id);

ALTER TABLE dds.сертификаты_пользователей
ADD CONSTRAINT fk_сертификаты_пользователи
FOREIGN KEY (user_id) REFERENCES dds.сотрудники_дар(id);

ALTER TABLE dds.среды_разработки_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_среды_разработки
FOREIGN KEY (среды_разработки_id) REFERENCES dds.среды_разработки(id);

ALTER TABLE dds.среды_разработки_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_среды_разработки
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.типы_систем_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_типы_систем
FOREIGN KEY (типы_систем_id) REFERENCES dds.типы_систем(id);

ALTER TABLE dds.типы_систем_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_типы_систем
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.технологии_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_технологии
FOREIGN KEY (технологии_id) REFERENCES dds.технологии(id);

ALTER TABLE dds.технологии_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_технологии
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.фреймворки_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_фреймворки
FOREIGN KEY (фреймворки_id) REFERENCES dds.фреймворки(id);

ALTER TABLE dds.фреймворки_и_уровень_знаний_сотрудников
ADD CONSTRAINT fk_уровень_знаний_фреймворки
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

ALTER TABLE dds.языки_пользователей
ADD CONSTRAINT fk_языки
FOREIGN KEY (язык_id) REFERENCES dds.языки(id);

ALTER TABLE dds.языки_пользователей
ADD CONSTRAINT fk_уровень_знаний_языки
FOREIGN KEY (уровень_знаний_иностранного_языка_id) REFERENCES dds.уровни_владения_ин(id);

ALTER TABLE dds.языки_программирования_и_уровень_знаний
ADD CONSTRAINT fk_языки_программирования
FOREIGN KEY (язык_программирования_id) REFERENCES dds.языки_программирования(id);

ALTER TABLE dds.языки_программирования_и_уровень_знаний
ADD CONSTRAINT fk_уровень_знаний_языки_программирования
FOREIGN KEY (уровень_знаний_id) REFERENCES dds.уровни_знаний(id);

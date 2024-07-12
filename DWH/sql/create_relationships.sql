ALTER TABLE базы_данных_и_уровень_владения
ADD CONSTRAINT fk_база_данных FOREIGN KEY (база_данных) REFERENCES базы_данных (id),
ADD CONSTRAINT fk_уровень_знаний FOREIGN KEY (уровень_знаний) REFERENCES уровни_знаний (id),
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES сотрудники_дпр (id);

ALTER TABLE инструменты_и_уровень_владения
ADD CONSTRAINT fk_инструмент FOREIGN KEY (инструмент) REFERENCES инструменты (id),
ADD CONSTRAINT fk_уровень_знаний FOREIGN KEY (уровень_знаний) REFERENCES уровни_знаний (id),
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES сотрудники_дпр (id);

ALTER TABLE среды_разработки_и_уровень_владения
ADD CONSTRAINT fk_среда_разработки FOREIGN KEY (среда_разработки) REFERENCES среды_разработки (id),
ADD CONSTRAINT fk_уровень_знаний FOREIGN KEY (уровень_знаний) REFERENCES уровни_знаний (id),
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES сотрудники_дпр (id);

ALTER TABLE платформы_и_уровень_владения
ADD CONSTRAINT fk_платформа FOREIGN KEY (платформа) REFERENCES платформы (id),
ADD CONSTRAINT fk_уровень_знаний FOREIGN KEY (уровень_знаний) REFERENCES уровни_знаний (id),
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES сотрудники_дпр (id);

ALTER TABLE языки_программирования_и_уровень_владения
ADD CONSTRAINT fk_язык FOREIGN KEY (язык) REFERENCES языки (id),
ADD CONSTRAINT fk_уровень_знаний FOREIGN KEY (уровень_знаний) REFERENCES уровни_знаний (id),
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES сотрудники_дпр (id);

ALTER TABLE технологии_и_уровень_владения
ADD CONSTRAINT fk_технология FOREIGN KEY (технология) REFERENCES технологии (id),
ADD CONSTRAINT fk_уровень_знаний FOREIGN KEY (уровень_знаний) REFERENCES уровни_знаний (id),
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES сотрудники_дпр (id);

ALTER TABLE языки_пользователей
ADD CONSTRAINT fk_язык FOREIGN KEY (язык) REFERENCES языки (id),
ADD CONSTRAINT fk_уровень_владения_языком FOREIGN KEY (уровень_владения_языком) REFERENCES уровни_знаний (id),
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES сотрудники_дпр (id);

ALTER TABLE типы_систем_и_уровень_владения
ADD CONSTRAINT fk_тип_системы FOREIGN KEY (тип_системы) REFERENCES типы_систем (id),
ADD CONSTRAINT fk_уровень_знаний FOREIGN KEY (уровень_знаний) REFERENCES уровни_знаний (id),
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES сотрудники_дпр (id);

ALTER TABLE фреймворки_и_уровень_владения
ADD CONSTRAINT fk_фреймворк FOREIGN KEY (фреймворк) REFERENCES фреймворки (id),
ADD CONSTRAINT fk_уровень_знаний FOREIGN KEY (уровень_знаний) REFERENCES уровни_знаний (id),
ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES сотрудники_дпр (id);
